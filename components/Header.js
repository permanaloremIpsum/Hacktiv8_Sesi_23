import React, {useEffect, useState} from 'react';
import { Text, View } from 'react-native';

export default function Header(){
    return(
        <View style={{backgroundColor: '#7C9473', padding: 10}}>
            <Text style={{
                fontSize: 30,
                color: 'white',
                fontWeight: 'bold'
            }}>
                Posts
            </Text>
        </View>
    )
}

// const styles = StyleSheet.create({
//     txtInput: {
//         color: '#ffffff',
//         padding: 5,
//         borderWidth: 1,
//         borderColor: '#ffffff',
//         marginBottom: 5
//     }
// })