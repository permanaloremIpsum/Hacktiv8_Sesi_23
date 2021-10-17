import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs' 
import AntDesign from 'react-native-vector-icons/AntDesign';

import Home from './Home'
// import PostPage from './PostPage'
import Profile from "./Profile";

const Stack = createBottomTabNavigator()

const Router = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Home" 
                    component={Home}
                    options={{
                        tabBarActiveTintColor: '#ff8e40',
                        tabBarIcon: ({ size }) => (
                            <AntDesign name="home" color='#ff8e40' size={size} />
                        )
                    }}
                />
                <Stack.Screen 
                    name="Profile" 
                    component={Profile}
                    options={{
                        tabBarActiveTintColor: '#ff8e40',
                        tabBarIcon: ({ size }) => (
                            <AntDesign name="user" color='#ff8e40' size={size} />
                        )
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router