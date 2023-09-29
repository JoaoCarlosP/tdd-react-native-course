import React, { useEffect } from 'react'
import { render, waitFor } from "@testing-library/react-native"
import { View } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'

import AppNavigator, { RootStackParamList } from "../AppNavigator"
import HomeScreen from '../HomeScreen'

jest.mock('../HomeScreen', () => jest.fn())
jest.mock('../WeatherScreen', () => jest.fn())


describe('AppNavigator', () => {
  test('Should render HomeScreen by default', async () => {
    (HomeScreen as jest.Mock).mockReturnValueOnce(<View testID='mock-home-screen' />)
    const wrapper = render(<AppNavigator />)
    
    await waitFor(() => {
      wrapper.getByTestId('mock-home-screen')
    })
  })

  test('Should render WeatherScreen on "weather" route', () => {
    (HomeScreen as jest.Mock).mockImplementationOnce(async () => {
      const navigation = useNavigation<NavigationProp<RootStackParamList>>()

      useEffect(() => {
        // Route + route params -> You search this into AppNavigator.tsx file
        navigation.navigate('Weather', { latitude: 0, longitude: 0 })
      }, [navigation])

      const wrapper = render(<AppNavigator />)

      await waitFor(() => {
        wrapper.getByTestId('mock-weather-screen')
      })
    })
  })
})