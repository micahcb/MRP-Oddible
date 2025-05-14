import { FontAwesome } from '@expo/vector-icons'
import { Redirect, Tabs } from 'expo-router'
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { useAuth0 } from 'react-native-auth0'
import colors from '../styles/colors'


const AppLayout = () => {
    const { user, isLoading, error } = useAuth0();    

 
    if (!user) {
        return <Redirect href="/signin" />
    }
    if (error) {
        return <Text>Error: {error.message}</Text>
    }

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.text,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: 'bold',
                }, 
                tabBarIconStyle: {
                    color: colors.primary,
                },
                
         
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Discovery',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="search" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="account"
                options={{
                    title: 'Account',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="user" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="social"
                options={{
                    title: 'Social',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="users" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    )
}

export default AppLayout

const styles = StyleSheet.create({})