import { render, waitFor } from "@testing-library/react-native"
import App from "../App"
import { View } from "react-native"
import AppNavigator from "../screens/AppNavigator"
import { Provider } from "react-redux"
import store from "../store"

jest.mock('../screens/AppNavigator', () => jest.fn())
jest.mock('react-redux', () => {
  return {
    ...jest.requireActual<object>('react-redux'),
    Provider: jest.fn()
  }
})

describe('App', () => {
  test('Should render routes', async () => {
    (Provider as jest.Mock).mockImplementationOnce(({children}) => children)
    
    const mockAppNavigator = (AppNavigator as jest.Mock)
    mockAppNavigator.mockReturnValueOnce(<View testID='mock-routes'/>)

    const wrapper = render(<App/>)

    await waitFor(() => {
      expect(wrapper.getByTestId('mock-routes'))
    })
  })

  test('Should render Provider', () => {
    let providerStore!: typeof store
    (Provider as jest.Mock).mockImplementationOnce(({ store }) => {
      providerStore = store
      return <View testID="mock-provider" />
  })

    const wrapper = render(<App />)
    wrapper.getByTestId('mock-provider')
    expect(providerStore).toBe(store)
  })

})