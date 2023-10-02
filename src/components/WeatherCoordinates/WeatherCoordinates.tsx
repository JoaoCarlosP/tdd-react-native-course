import { NavigationProp, useNavigation } from '@react-navigation/native'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { RootStackParamList } from '../../screens/AppNavigator'
import Button from '../Button/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import { Colors } from '../../constants'
import * as yup from 'yup'

export type IFormValues = {
  latitude: string,
  longitude: string
}

const defaultValues: IFormValues = {
  latitude: '',
  longitude: ''
}

const validationSchema = yup.object().shape({
  latitude: yup.number().min(-90).max(90),
  longitude: yup.number().min(-180).max(180),
})

function WeatherCoordinates() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const form = useForm<IFormValues>({
    resolver: yupResolver<any>(validationSchema),
    defaultValues,
    mode: 'onChange'
  })

  const handleSubmit = form.handleSubmit((values) => {
    if (values?.latitude !== undefined && values?.longitude !== undefined) {
      const latitude = parseFloat(values?.latitude)
      const longitude = parseFloat(values?.longitude)
      
      navigation.navigate('Weather',  { latitude, longitude })
    }
  })

  return (
    <View testID='weather-coordinates'>
      <View style={styles.inputs}>
        <Controller
          name='latitude'
          control={form.control}
          render={({ field: { onChange, ...rest }}) => (
            <TextInput
              {...rest}
              testID='weather-coordinates-latitude'
              onChangeText={onChange}
              style={styles.input}
              placeholder='Latitude'
              placeholderTextColor={Colors.GRAY}
            />
          )}
        />

        {form.formState.errors.latitude && <Text style={styles.error}>Latitude must be a valid number</Text>}

        <Controller
          name='longitude'
          control={form.control}
          render={({ field: { onChange, ...rest }}) => (
            <TextInput
              {...rest}
              testID='weather-coordinates-longitude'
              onChangeText={onChange}
              style={styles.input}
              placeholder='Longitude'
              placeholderTextColor={Colors.GRAY}
            />
          )}
        />

        {form.formState.errors.longitude && <Text style={styles.error}>Longitude must be a valid number</Text>}
      </View>

      <Button onPress={handleSubmit} label='Find' testID='coordinate-button' />
    </View>
  )
}

export default WeatherCoordinates

const styles = StyleSheet.create({
  inputs: {
    flexDirection: 'column',
    marginBottom: 15
  },
  input: {
    backgroundColor: Colors.TRANSPARENT,
    margin: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    paddingHorizontal: 15,
    paddingVertical: 8,
    color: Colors.WHITE
  },
  error: {
    marginHorizontal: 5,
    color: Colors.ERROR
  }
})