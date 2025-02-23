import React from 'react'
import Feather from '@expo/vector-icons/Feather'
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconProps } from './IconInterfaces';


const StarIcn = ({
  size = 24,
  color = '#000000',
  onPress,
}: IconProps) => {
  return (
    <TouchableOpacity style={localStyles.iconContainer} onPress={onPress}>
      <Feather
        name='star'
        size={size}
        color={color}
        style={localStyles.icon}
      />
    </TouchableOpacity>
  )
}

const localStyles = StyleSheet.create({

  iconContainer: {
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    alignSelf: "center",
    verticalAlign: "middle",
  }

})

export default StarIcn

