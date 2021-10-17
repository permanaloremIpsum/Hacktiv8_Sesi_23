import React from "react";
import { Text, View, Image } from "react-native";

const Profile = () => {
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', paddingRight: 15, paddingLeft: 15}}>
            <View style={{alignSelf:'center'}}>
                <Image 
                    style={{ width: 300, height: 200, margin: 10}}
                    source={require('../assets/profile.png')}
                />
            </View>
            <Text style={{fontSize: 24, fontWeight:'bold', color:"#313131", marginBottom: 15}}>Hello !!</Text>
            <Text style={{color: "#a8adbf", marginBottom: 5}}>This is my Profile Page</Text>
            <Text style={{color: "#a8adbf"}}>Click on the profile or home button below</Text>    
        </View>
    )
}

export default Profile