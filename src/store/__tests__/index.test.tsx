import { render } from "../../utils/test.utils"
import store from '..'
import { View } from "react-native"

describe('Store', () => {
  test('Should be a valid store', () => {
    const wrapper = render(<View testID='mock-component' />, {store})
    wrapper.getByTestId('mock-component')
  })
})