import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, ViewProps } from 'react-native'
import { Colors } from '../../constants'

type Props = {
  label: string
  onPress: () => void 
  loading?: boolean
} & ViewProps

function Button({ label, onPress, loading, style, ...rest }: Props ) {
  return (
    <TouchableOpacity testID='button' onPress={onPress}>
      <LinearGradient
        {...rest}
        colors={[Colors.LIGHTER_GRAY, Colors.DARK_GREY]}
        style={[styles.container, style]}
        >
          <Text style={styles.label}>{label}</Text>
          
          {loading &&
            <ActivityIndicator
              testID='button-loading'
              size={24}
              color={Colors.WHITE}/>
            }
        </LinearGradient>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontSize: 19,
    color: Colors.WHITE
  }
})