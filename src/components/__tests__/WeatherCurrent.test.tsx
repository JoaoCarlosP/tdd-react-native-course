import React from 'react'
import WeatherCurrent from '../WeatherCurrent/WeatherCurrent'
import { fireEvent, render, waitFor } from "@testing-library/react-native"
import { useNavigation } from '@react-navigation/native'
import LocationService from '../../services/LocationService'
import { act } from 'react-test-renderer'
import { Colors } from '../../constants'
import '@testing-library/jest-native/extend-expect'

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual<object>('@react-navigation/native'),
    useNavigation: jest.fn().mockReturnValue({ navigate: jest.fn() })
  }
})

describe('WeatherCurrent', () => {
  test('Should render correctly', () => {
    const wrapper = render(<WeatherCurrent />)
    wrapper.getByTestId('weather-current')
  })

  test('Should render label', () => {
    const wrapper = render(<WeatherCurrent />)
    wrapper.getByText('Weather at my position')
  })

  test('Should navigate to weather screen with location',  async ()=> {
    const mockNavigate = jest.fn()
    const useNavigationLikeMock = (useNavigation as jest.Mock)

    useNavigationLikeMock.mockReturnValueOnce({ navigate: mockNavigate })

    // Create a mock to getCurrentPosition() function of LocationService
    jest.spyOn(LocationService, 'getCurrentPosition').mockResolvedValueOnce({ latitude: 0, longitude: 0 });

    const wrapper = render(<WeatherCurrent />)
    const button = wrapper.getByTestId('weather-current')

    fireEvent.press(button)
    
    // Verifica se quando recebe os valores, a tela é redirecionada para 'Weather' junto com os valores de longitude e latitude
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Weather', { latitude: 0, longitude: 0 }) 
    })
  })

  describe('Loader', () => {
    test('Should be rendered when position is being fetched', async () => {
      let mockResolve!: (position: { latitude: number, longitude: number}) => void

      // Substitui a função original por uma Promise
      jest.spyOn(LocationService, 'getCurrentPosition').mockImplementationOnce(() => new Promise(resolve => { mockResolve = resolve }))

      const wrapper = render(<WeatherCurrent />)
      const button = wrapper.getByTestId('weather-current')
      fireEvent.press(button)

      // Verifica se o button-loading foi renderizado
      await expect(wrapper.findByTestId('button-loading')).resolves.toBeDefined()

      // Nesta parte a função é "resolvida" (Tem um retorno) após ocorrerem os testes
      await act(async () => {
        await mockResolve({ latitude: 0, longitude: 0 })
      })
    })

    test('Should not be rendered when position has been fetched', async () => {
      jest.spyOn(LocationService, 'getCurrentPosition').mockResolvedValueOnce({ latitude: 0, longitude: 0 });
    
      const wrapper = render(<WeatherCurrent />)
      const button = wrapper.getByTestId('weather-current')
  
      fireEvent.press(button)
    
      // Aguarda a resposta da Promise, no caso a nossa latitude: 0 e longitude: 0
      await waitFor(() => {
        expect(wrapper.queryByTestId('button-loading')).toBeNull()
      });
    });

    test('Should not be rendered when fetching position has failed', async () => {
      jest.spyOn(LocationService, 'getCurrentPosition').mockRejectedValueOnce(new Error('Failed to fetch position'))

      const wrapper = render(<WeatherCurrent />)
      const button = wrapper.getByTestId('weather-current')
      fireEvent.press(button)

      // Esperando a resposta da Promise (no caso, o nosso Erro())
      await waitFor(() => {
        expect(wrapper.queryByTestId('button-loading')).toBeNull() // Verifica se o componente de carregamento não está presente
      })

    })
  })

  describe('Error', () => {
    test('Should be displayed after fetching position has failed', async () => {
      jest.spyOn(LocationService, 'getCurrentPosition').mockRejectedValueOnce(new Error('Failed to fetch position'))

      const wrapper = render(<WeatherCurrent />)
      const button = wrapper.getByTestId('weather-current')
      fireEvent.press(button)

      // Verifica se quando der erro, o botão de buscar recebe essas propriedades
      await waitFor(() => {
        expect(button).toHaveStyle({ borderColor: Colors.ERROR })
      })
    })

    test('Should be reset after fetching position again', async () => {
      jest.spyOn(LocationService, 'getCurrentPosition').mockRejectedValueOnce(new Error('Failed to fetch position'))

      const wrapper = render(<WeatherCurrent />)
      const button = wrapper.getByTestId('weather-current')
      fireEvent.press(button)

      // Espera pela primeira atualização de estilo (erro)
      await waitFor(() => {
        expect(button).toHaveStyle({ borderColor: Colors.ERROR })
      })

      // Pressiona o botão novamente
      fireEvent.press(button)

      // Espera pela segunda atualização de estilo (reset)
      await waitFor(() => {
        expect(button).not.toHaveStyle({ borderColor: Colors.ERROR })
      })
    })
  })
})