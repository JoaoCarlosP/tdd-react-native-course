import { fireEvent, render, waitFor } from "@testing-library/react-native"
import WeatherCoordinates from "../WeatherCoordinates/WeatherCoordinates"
import { useNavigation } from "@react-navigation/native"

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual<object>('@react-navigation/native'),
    useNavigation: jest.fn().mockReturnValue({ navigate: jest.fn() })
  }
})

describe('WeatherCoordinates', () => {
  test('Should render correctly', () => {
    const wrapper = render(<WeatherCoordinates />)
    wrapper.getByTestId('weather-coordinates')
  })

  test('Should navigate to Weather Screen with given coordinates when valid form is submit', async () => {
    const mockNavigate = jest.fn()
    const useNavigationMock = (useNavigation as jest.Mock)
    useNavigationMock.mockReturnValue({ navigate: mockNavigate })

    const wrapper = render(<WeatherCoordinates />)

    const fields = {
      latitude: wrapper.getByTestId('weather-coordinates-latitude'),
      longitude: wrapper.getByTestId('weather-coordinates-longitude'),
    }

    // Preenche o formulário com latitude e longitude
    fireEvent.changeText(fields.latitude, '0')
    fireEvent.changeText(fields.longitude, '0')

    // Pressiona o botão de enviar
    const button = wrapper.getByTestId('coordinate-button')
    fireEvent.press(button)

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Weather', { latitude: 0, longitude: 0 })
    })
  })

  describe('Latitude Field', () => {
    test('Should not show error when value is the lowest range value', async () => {
      const wrapper = render(<WeatherCoordinates />)

      const field = wrapper.getByTestId('weather-coordinates-latitude')
      fireEvent.changeText(field, '-90')

      await waitFor(() => {
        expect(wrapper.queryByText('Latitude must be a valid number')).toBeNull()    
      })
    })

    test('Should not show error when value is the hightest range value', async () => {
      const wrapper = render(<WeatherCoordinates />)

      const field = wrapper.getByTestId('weather-coordinates-latitude')
      fireEvent.changeText(field, '90')

      await waitFor(() => {
        expect(wrapper.queryByText('Latitude must be a valid number')).toBeNull()    
      })
    })

    test('Should not show error when value is the lower than the lowest range value', async () => {
      const wrapper = render(<WeatherCoordinates />)

      const field = wrapper.getByTestId('weather-coordinates-latitude')
      fireEvent.changeText(field, '-91')

      await waitFor(() => {
        wrapper.queryByText('Latitude must be a valid number')
      })
    })

    test('Should not show error when value is the higher than the highest range value', async () => {
      const wrapper = render(<WeatherCoordinates />)

      const field = wrapper.getByTestId('weather-coordinates-latitude')
      fireEvent.changeText(field, '91')

      await waitFor(() => {
        wrapper.queryByText('Latitude must be a valid number')
      })
    })

    test('Should show error when value is not a number', async () => {
      const wrapper = render(<WeatherCoordinates />)

      const field = wrapper.getByTestId('weather-coordinates-latitude')
      fireEvent.changeText(field, 'hello')

      await waitFor(() => {
        wrapper.queryByText('Latitude must be a valid number')
      })
    })
  })

  describe('Longitude Field', () => {
    test('Should not show error when value is the lowest range value', async () => {
      const wrapper = render(<WeatherCoordinates />)

      const field = wrapper.getByTestId('weather-coordinates-longitude')
      fireEvent.changeText(field, '-180')

      await waitFor(() => {
        expect(wrapper.queryByText('Longitude must be a valid number')).toBeNull()    
      })
    })

    test('Should not show error when value is the hightest range value', async () => {
      const wrapper = render(<WeatherCoordinates />)

      const field = wrapper.getByTestId('weather-coordinates-longitude')
      fireEvent.changeText(field, '180')

      await waitFor(() => {
        expect(wrapper.queryByText('Longitude must be a valid number')).toBeNull()    
      })
    })

    test('Should not show error when value is the lower than the lowest range value', async () => {
      const wrapper = render(<WeatherCoordinates />)

      const field = wrapper.getByTestId('weather-coordinates-longitude')
      fireEvent.changeText(field, '-181')

      await waitFor(() => {
        wrapper.queryByText('Longitude must be a valid number')
      })
    })

    test('Should not show error when value is the higher than the highest range value', async () => {
      const wrapper = render(<WeatherCoordinates />)

      const field = wrapper.getByTestId('weather-coordinates-longitude')
      fireEvent.changeText(field, '181')

      await waitFor(() => {
        wrapper.queryByText('Longitude must be a valid number')
      })
    })

    test('Should show error when value is not a number', async () => {
      const wrapper = render(<WeatherCoordinates />)

      const field = wrapper.getByTestId('weather-coordinates-longitude')
      fireEvent.changeText(field, 'hello')

      await waitFor(() => {
        wrapper.queryByText('Longitude must be a valid number')
      })
    })
  })
})