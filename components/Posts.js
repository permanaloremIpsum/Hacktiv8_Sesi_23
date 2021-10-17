import React, {useEffect, useState} from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Post from './Post';

export default function Posts(){
    return(
        <ScrollView style={styles.scroll}>
            <Post />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scroll: {
      backgroundColor: '#7C9473',
      padding: 10
    }
});