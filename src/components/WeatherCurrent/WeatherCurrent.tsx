import { NavigationProp, useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import LocationService from '../../services/LocationService';
import { RootStackParamList } from '../../screens/AppNavigator';
import Button from '../Button/Button';
import * as Location from 'expo-location'
import { Colors } from '../../constants';
import { StyleSheet } from 'react-native';

type WeatherParams = {
  latitude: number;
  longitude: number;
};

function WeatherCurrent() {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const handleFetchWeather = useCallback(async () => {
    setLoading(true)
    setError(false)
    try {
      const position: WeatherParams | undefined = await LocationService.getCurrentPosition();
      
      if (position && position?.latitude !== null && position?.longitude !== null) {
        navigation.navigate('Weather', {
          latitude: position.latitude || 0,
          longitude: position.longitude || 0,
        });
      }
    } catch (error) {
      setError(true)
    } 
    setLoading(false)
  }, [navigation]);
  


  return (
    <Button testID='weather-current'
      label='Weather at my position'
      onPress={handleFetchWeather}
      loading={loading}
      style={error && styles.error}
    />
  )
}

const styles = StyleSheet.create({
  error: {
    borderColor: Colors.ERROR,
    borderWidth: 1,
    borderRadius: 10
  }
})

export default WeatherCurrent
