import { NavigationProp, useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import LocationService from '../../services/LocationService';
import { RootStackParamList } from '../../screens/AppNavigator';
import Button from '../Button/Button';
import * as Location from 'expo-location'


type WeatherParams = {
  latitude: number;
  longitude: number;
};

function WeatherCurrent() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const handleFetchWeather = useCallback(async () => {
    try {
      const position: WeatherParams | undefined = await LocationService.getCurrentPosition();
      
      if (position && position?.latitude !== null && position?.longitude !== null) {
        navigation.navigate('Weather', {
          latitude: position.latitude || 0,
          longitude: position.longitude || 0,
        });
      }
    } catch (error) {
      console.error('Erro ao buscar a posição:', error);
    }
  }, [navigation]);
  


  return (
    <Button testID='weather-current'
      label='Heloooo'
      onPress={handleFetchWeather}
    />
  )
}

export default WeatherCurrent
