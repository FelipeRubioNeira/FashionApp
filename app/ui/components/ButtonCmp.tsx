import { Pressable, StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'
import measures from '../constants/measures'


// --------------- types --------------- //
interface ButtonCmpProps {
    onPress: () => void,
    text: string,
    style?: StyleProp<ViewStyle>
}

// --------------- component --------------- //
const ButtonCmp = ({ onPress, text, style }: ButtonCmpProps) => {
    return (
        <TouchableOpacity
            style={[localStyles.button, style]}
            onPress={onPress}
        >
            <Text style={localStyles.label}>{text}</Text>

        </TouchableOpacity>
    )
}


// --------------- styles --------------- //
const localStyles = StyleSheet.create({

    button: {
        borderWidth: 1,
        borderRadius: 10,
        height: measures.BUTTON_HEIGTH,
        justifyContent: "center",
        alignItems: "center"
    },
    label:{
        fontSize: 16,
        fontWeight: "bold",
        color: "#000"
    }

})


// --------------- export --------------- //
export default ButtonCmp