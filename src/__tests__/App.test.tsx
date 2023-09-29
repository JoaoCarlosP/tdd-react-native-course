import { render } from '@testing-library/react-native'
import React from 'react'
import App from '../App'
import AppNavigator from '../screens/AppNavigator'
import { View } from 'react-native'

jest.mock('../screens/AppNavigator', () => jest.fn())

describe('App', () => {
  test('Should render routes', () => {
    (AppNavigator as jest.Mock).mockReturnValueOnce(<View testID='mock-routes'/>)
    const wrapper = render(<App />)

    wrapper.getByTestId('mock-routes')
  })
})