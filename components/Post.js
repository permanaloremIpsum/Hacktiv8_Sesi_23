import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ToastAndroid, Alert } from 'react-native';

export default function Post(){
    const [posts, setPosts] = useState([])
    const [id, setId] = useState(-1)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const endpoint = 'http://192.168.1.5:4000/posts'

    const savePost = () => {
        if(id !== -1){
            updatePost()
        }else{
            addPost()
        }        
    }

    const addPost = async () => {
        if(title !== '' && description !== ''){
            const response = await fetch(`${endpoint}`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({ title, description })
            })
            const data = await response.json()
            setPosts([...posts, data])
            setTitle('')
            setDescription('')
            notifToast('Success add posts!!')
        }else{
            notifToast(`Title and description can't be empty!!`)
        }
    }

    const deletePost = async (postID) => {
        await fetch(`${endpoint}/${postID}`, {
            method: 'DELETE',
        })
        const data = posts.filter((post, index) => post.id !== postID).map(({id, title, description}) => ({id, title, description}))
        setPosts(data)
        notifToast('Success delete posts!!')
    }

    const editPost = async (postID) => {
        const response = await fetch(`${endpoint}/${postID}`, {
            method: 'GET',
        })
        const data = await response.json()
        setTitle(data.title)
        setDescription(data.description)
        setId(postID)
    }

    const updatePost = async () => {
        if(title !== '' && description !== ''){
            const temp = posts
            const response = await fetch(`${endpoint}/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({ title, description })
            })
            const data = await response.json()
            const newData = temp.map(item => item.id === data.id ? data : item)
            setPosts(newData)
            setId(-1)
            setTitle('')
            setDescription('')
            notifToast('Success update posts!!')
        }else{
            notifToast(`Title and description can't be empty!!`)
        }
    }

    const loadData = async () => {
        const response = await fetch(`${endpoint}`)
        const data = await response.json()
        setPosts(data)
    }

    const notifToast = (message) => {
        ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        )
    }

    const deleteAlert = (idx) =>
        Alert.alert(
        "Confirm Delete",
        `Are you sure to delete ${posts[idx].title}`,
        [
            {
            text: "Cancel",
            style: "cancel"
            },
            { text: "OK", onPress: () => deletePost(posts[idx].id) }
        ]
    )

    useEffect(() => {
        loadData()
    }, [])

    
    return(
        <>
        <TextInput 
            placeholder="Title"
            placeholderTextColor='#313131'
            style={styles.txtInput}
            onChangeText={text => setTitle(text)}
            defaultValue={title}
        />
        <TextInput 
            placeholder="Description"
            placeholderTextColor='#313131'
            style={styles.txtInput}
            onChangeText={text => setDescription(text)}
            defaultValue={description}
        />
        <Pressable onPress={savePost} style={styles.btnSave}>
            <Text style={{color:'white', textAlign: 'center', fontWeight:'bold'}}>Save</Text>
        </Pressable>
        {
            posts.map((post, idx) => (
                <View style={styles.boxContainer} key={idx}>
                    <View style={styles.boxList}>
                        <View style={styles.boxText}>
                            <Text style={styles.postTitle}>
                                {post.title}
                            </Text>
                            <Text style={styles.postDescription}>
                                {post.description}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.boxButton}>
                        <View style={{flex:1, flexDirection:'row', marginLeft: -15}}>
                            <Pressable style={styles.btnEdit} onPress={() => editPost(post.id)} >
                                <Text style={{color: 'white', textAlign: 'center', marginTop: 10, fontWeight:'bold', fontSize: 8}}>Edit</Text>
                            </Pressable>
                            <Pressable style={styles.btnDelete} onPress={() => deleteAlert(idx)} >
                                <Text style={{color: 'white', textAlign: 'center', marginTop: 10, fontWeight:'bold', fontSize: 8}}>Delete</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            ))
        }
        </>
    )
}

const styles = StyleSheet.create({
    boxContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'white',
      marginTop: 15,
      borderRadius: 5
    },
    boxList: {
      flex: 5,
    },
    boxButton: {
      flex: 1,
      marginTop: 10,
      padding: 10
    },
    boxText: {
      padding: 10,
      borderRadius: 5
    },
    postTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: "#000"
    },
    postDescription: {
      fontSize: 14,
      fontWeight: 'normal',
      color: "#000"
    },
    txtInput: {
      backgroundColor: '#f7f7f7',
      color: '#313131',
      padding: 5,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#313131',
      marginBottom: 5
    },
    btnSave: {
      flex: 1,
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5
    },
    btnUpdate: {
      flex: 1,
      backgroundColor: 'aqua',
      padding: 10,
      borderRadius: 5,
      marginTop: 5
    },
    btnEdit: {
      width: 30,
      height: 30,
      borderRadius: 5,
      marginRight: 5,
      backgroundColor: 'green',
    },
    btnDelete: {
      width: 30,
      height: 30,
      borderRadius: 5,
      backgroundColor: 'red',
    }
});