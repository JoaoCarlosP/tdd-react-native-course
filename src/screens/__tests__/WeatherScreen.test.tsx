import WeatherScreen from "../WeatherScreen"
import { useNavigation } from "@react-navigation/native"
import {fireEvent, render, waitFor, mockStore, act } from "../../utils/test.utils"
import { fetchWeather, fetchWeatherFailure, fetchWeatherSuccess } from "../../store/weather/actions"
import { nullWeather } from "../../types/Weather"

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual<object>('@react-navigation/native'),
    useNavigation: jest.fn().mockReturnValue({ goBack: jest.fn() }),
    useRoute: jest.fn().mockReturnValue({ params: { latitude: 0, longitude: 0 }})
  }
})

describe('WeatherScreen', () => {
  test('Should render correctly', () => {
    const wrapper = render(<WeatherScreen />)
    wrapper.getByTestId('weather-screen')
  })

  test('Should return to home when button home is pressed', () => {
    const mockGoBack = jest.fn()
    const useNavigationMock = (useNavigation as jest.Mock)
    useNavigationMock.mockReturnValueOnce({ goBack: mockGoBack })

    const wrapper = render(<WeatherScreen />)
    const button = wrapper.getByText('Home')

    fireEvent.press(button)
    expect(mockGoBack).toHaveBeenCalled()
  })

  test('Should fetch weather', async() => {
    const interceptor = jest.fn()
    const store = mockStore(interceptor)

    render(<WeatherScreen />, { store })

    await waitFor(() => {
      expect(interceptor).toHaveBeenCalledWith(fetchWeather(0, 0))
    })
  })

  test('Should display loading when fetching weather', () => {
    const wrapper = render(<WeatherScreen />)
    wrapper.getByTestId('weather-screen-loader')
  })

  test('Should display given error', () => {
    const store = mockStore()
    const wrapper = render(<WeatherScreen />, { store })

    act(() => {
      store.dispatch(fetchWeatherFailure('mock-error'))
    })

    wrapper.getByText('mock-error')
  })

  test('Should display image with given weather icon ', () => {
    const store = mockStore()
    const wrapper = render(<WeatherScreen />, { store })

    act(() => {
      store.dispatch(fetchWeatherSuccess({...nullWeather, icon: 'mock-icon'}))
    })

    const image = wrapper.getByTestId('weather-screen-icon')
    expect(image.props.source.uri).toBe('mock-icon')
  })

  test('Should not display icon when weather has no icon ', () => {
    const store = mockStore()
    const wrapper = render(<WeatherScreen />, { store })

    act(() => {
      store.dispatch(fetchWeatherSuccess(nullWeather))
    })

    expect(() => wrapper.getByTestId('weather-screen-icon')).toThrow()
  })

  test('Should display description from given weather', () => {
    const store = mockStore()
    const wrapper = render(<WeatherScreen />, { store })

    act(() => {
      store.dispatch(fetchWeatherSuccess({...nullWeather, description: 'mock-description'}))
    })

    wrapper.getByText('mock-description')
  })

  test('Should not display description when weather has no description ', () => {
    const store = mockStore()
    const wrapper = render(<WeatherScreen />, { store })

    act(() => {
      store.dispatch(fetchWeatherSuccess(nullWeather))
    })

    expect(() => wrapper.getByTestId('weather-screen-description')).toThrow()
  })

  test('Should display city name from given weather', () => {
    const store = mockStore()
    const wrapper = render(<WeatherScreen />, { store })

    act(() => {
      store.dispatch(fetchWeatherSuccess({...nullWeather, city: 'mock-city'}))
    })

    wrapper.getByText('mock-city')
  })

  test('Should display formatted temperature', () => {
    const store = mockStore()
    const wrapper = render(<WeatherScreen />, { store })

    act(() => {
      store.dispatch(fetchWeatherSuccess({...nullWeather, temperature: 10.8}))
    })

    const container = wrapper.getByTestId('weather-screen-temperature')

    expect(wrapper.getByText('Temperature')).toBeTruthy()
    expect(wrapper.getByText('11ºC')).toBeTruthy()
  })

  test('Should display formatted windSpeed', () => {
    const store = mockStore()
    const wrapper = render(<WeatherScreen />, { store })

    act(() => {
      store.dispatch(fetchWeatherSuccess({...nullWeather, windSpeed: 5.45}))
    })

    const container = wrapper.getByTestId('weather-screen-wind-speed')

    expect(wrapper.getByText('Wind speed')).toBeTruthy()
    expect(wrapper.getByText('5.45m/s')).toBeTruthy()
  })

  test('Should display formatted Humidity', () => {
    const store = mockStore()
    const wrapper = render(<WeatherScreen />, { store })

    act(() => {
      store.dispatch(fetchWeatherSuccess({...nullWeather, humidity: 30}))
    })

    const container = wrapper.getByTestId('weather-screen-humidity')

    expect(wrapper.getByText('Humidity')).toBeTruthy()
    expect(wrapper.getByText('30%')).toBeTruthy()
  })

  test('Should display formatted Pressure', () => {
    const store = mockStore()
    const wrapper = render(<WeatherScreen />, { store })

    act(() => {
      store.dispatch(fetchWeatherSuccess({...nullWeather, pressure: 1500}))
    })

    const container = wrapper.getByTestId('weather-screen-pressure')

    expect(wrapper.getByText('Pressure')).toBeTruthy()
    expect(wrapper.getByText('1500hPa')).toBeTruthy()
  })
})