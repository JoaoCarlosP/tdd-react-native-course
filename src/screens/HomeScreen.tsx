import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../constants'
import moment from 'moment'
import WeatherCurrent from '../components/WeatherCurrent/WeatherCurrent'
import WeatherCordinates from '../components/WeatherCordinates/WeatherCordinates'

function HomeScreen() {
  const now = moment(new Date())

  return (
    <LinearGradient colors={[Colors.LIGHT_GRAY, Colors.DARKER_GRAY]} style={styles.container} testID='home-screen'>
      <View style={styles.title}>
        <Text style={styles.date}>{now.format('MMM DD, YYYY')}</Text>
        <Text style={styles.day}>{now.format('dddd')}</Text>
      </View>

      <WeatherCurrent />

      <Text testID='home-screen-divider' style={styles.divider}>Or</Text>

      <WeatherCordinates />
    </LinearGradient>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    paddingHorizontal: 40,
    alignContent: 'space-between',
    justifyContent: 'space-around'
  },
  title: {
    justifyContent: 'flex-end'
  },
  date: {
    color: Colors.GRAY,
    fontSize: 13
  },
  day: {
    color: Colors.WHITE,
    fontSize: 21
  },
  divider: {
    color: Colors.WHITE,
    textAlign: 'center'
  }
})
