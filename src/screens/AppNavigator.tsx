
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import HomeScreen from './HomeScreen'
import WeatherScreen from './WeatherScreen'

export type RootStackParamList = {
  Home: undefined
  Weather: { latitude: number, longitude: number } | undefined
}

const RootStack = createStackNavigator<RootStackParamList>()

function AppNavigator () {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name='Home' component={HomeScreen} />
        <RootStack.Screen name='Weather' component={WeatherScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator

