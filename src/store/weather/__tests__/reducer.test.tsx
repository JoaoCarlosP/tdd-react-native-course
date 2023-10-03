import Status from "../../../types/Status"
import { WeatherType, nullWeather } from "../../../types/Weather"
import { fetchWeather, fetchWeatherFailure, fetchWeatherReset, fetchWeatherSuccess } from "../actions"
import reducer from "../reducer"

describe('Store/weather', () => {
  const mockWeather: WeatherType = {
    city: 'mock-city',
    description: 'mock-description',
    humidity: 100,
    icon: 'mock-icon',
    pressure: 1000,
    temperature: 10,
    windSpeed: 10
  }

  const initialState = {
    status: Status.START,
    error: '',
    weather: nullWeather
  }

  describe('reducer', () => {
    test('Should return initialState', () => {
      const state = reducer(undefined, { type: '@@INIT' })
      expect(state).toEqual(initialState)
    })

    test('Should handle fetchWeather action', () => {
      const state = reducer(undefined, fetchWeather(0,0))
      expect(state).toEqual({
        error: '',
        weather: nullWeather,
        status: Status.LOADING
      })
    })

    test('Should handle fetchWeatherSuccess', () => {
      const state = reducer(undefined, fetchWeatherSuccess(mockWeather))
      expect(state).toEqual({
        status: Status.SUCCESS,
        error: '',
        weather: mockWeather
      })
    })

    test('Should handle fectchWeatherFailure', () => {
      const state = reducer(undefined, fetchWeatherFailure('mock-error'))
      expect(state).toEqual({
        status: Status.FAILURE,
        error: 'mock-error',
        weather: nullWeather
      })
    })
    
    test('Should handle fetchWeatherReset', () => {
      const success = reducer(undefined, fetchWeatherSuccess(mockWeather))
      console.log({ success })
      const state = reducer(success, fetchWeatherReset())
      console.log({ state })
      expect(state).toEqual(initialState)
    })
  })
})