import { ImageStyle, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { ComponentProps } from 'react'
import Feather from '@expo/vector-icons/Feather';
import Colors from '../../constants/colors';
import measures from '../../../ui/constants/measures'

interface IconDefaultProps {
    color?: string,
    size?: number,
    name: ComponentProps<typeof Feather>['name'],
    style?: ViewStyle,
    disabled?: boolean,
    onPress?: () => void
}

const IconDefault = ({
    name,
    color = Colors.BLACK,
    size = measures.ICON,
    style,
    disabled,
    onPress
}: IconDefaultProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={style}
            disabled={disabled}
        >
            <Feather
                name={name}
                size={size}
                color={color}
            />

        </TouchableOpacity>
    )
}

export default IconDefault
