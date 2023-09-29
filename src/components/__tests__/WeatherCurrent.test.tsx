import React from 'react'
import WeatherCurrent from '../WeatherCurrent/WeatherCurrent'
import { fireEvent, render, waitFor } from "@testing-library/react-native"
import { useNavigation } from '@react-navigation/native'
import LocationService from '../../services/LocationService'

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual<object>('@react-navigation/native'),
    useNavigation: jest.fn()
  }
})

describe('WeatherCurrent', () => {
  test('Should render correctly', () => {
    const wrapper = render(<WeatherCurrent />)
    wrapper.getByTestId('weather-current')
  })

  test('Should navigate to weather screen with location',  async ()=> {
    const mockNavigate = jest.fn()
    const useNavigationLikeMock = (useNavigation as jest.Mock)

    useNavigationLikeMock.mockReturnValueOnce({ navigate: mockNavigate })
    jest.spyOn(LocationService, 'getCurrentPosition').mockResolvedValueOnce({ latitude: 0, longitude: 0 });

    const wrapper = render(<WeatherCurrent />)
    const button = wrapper.getByTestId('weather-current')

    fireEvent.press(button)
    
    await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith('Weather', { latitude: 0, longitude: 0 }) 
    })
  })
})