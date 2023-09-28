import { render } from "@testing-library/react-native"
import HomeScreen from "../HomeScreen"
import { View } from "react-native"
import WeatherCurrent from "../../components/WeatherCurrent/WeatherCurrent"
import WeatherCordinates from "../../components/WeatherCordinates/WeatherCordinates"

jest.mock('../../components/WeatherCurrent/WeatherCurrent', () => jest.fn().mockReturnValue(null))
jest.mock('../../components/WeatherCordinates/WeatherCordinates', () => jest.fn().mockReturnValue(null))

describe('HomeScreen', () => {
  test('Should render correctly', () => {
    const wrapper = render(<HomeScreen />)
    wrapper.getByTestId('home-screen')
  })

  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(946684800000)
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('Title section', () => {

    test('Should contain current date', () => {
      const wrapper = render(<HomeScreen />)
      wrapper.getByText('Dec 31, 1999')
    })
  })

  test('Should contain a current day', () => {
    const wrapper = render(<HomeScreen />)
    wrapper.getByText('Friday')
  })

  test('Should contain a screen divider', () => {
    const wrapper = render(<HomeScreen />)
    wrapper.getByTestId('home-screen-divider')
  })

  test('Should contain a section to get current weather', () => {
    (WeatherCurrent as jest.Mock).mockReturnValue(<View testID="mock-weather-current"/>)

    const wrapper = render(<HomeScreen />)
    wrapper.getByTestId('mock-weather-current')
  })

  test('Should contain a section to get weather at given latitude & longitude', () => {
    (WeatherCordinates as jest.Mock).mockReturnValue(<View testID="mock-weather-cordinates"/>)

    const wrapper = render(<HomeScreen />)
    wrapper.getByTestId('mock-weather-cordinates')
  })
})
