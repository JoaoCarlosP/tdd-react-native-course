import { render } from "@testing-library/react-native"
import WeatherCordinates from "../WeatherCordinates/WeatherCordinates"

describe('WeatherCordinates', () => {
  test('Should render correctly', () => {
    const wrapper = render(<WeatherCordinates />)
    wrapper.getByTestId('weather-cordinates')
  })
})