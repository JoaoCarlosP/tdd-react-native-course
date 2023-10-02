import { render } from "@testing-library/react-native"
import WeatherCoordinates from "../WeatherCoordinates/WeatherCoordinates"

describe('WeatherCordinates', () => {
  test('Should render correctly', () => {
    const wrapper = render(<WeatherCoordinates />)
    wrapper.getByTestId('weather-cordinates')
  })
})