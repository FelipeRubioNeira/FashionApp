import { Pressable, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'
import measures from '../constants/measures'
import globalStyles from '../constants/globalStyles/globalStyles'
import Colors from '../constants/colors'


// --------------- types --------------- //
interface ButtonCmpProps {
    onPress: () => void,
    text: string,
    style?: StyleProp<ViewStyle>
    textStyle?: TextStyle
}

// --------------- component --------------- //
const ButtonCmp = ({ onPress, text, style, textStyle }: ButtonCmpProps) => {
    return (
        <TouchableOpacity
            style={[localStyles.button, style]}
            onPress={onPress}
        >
            <Text style={[localStyles.label, textStyle]}>
                {text}
            </Text>

        </TouchableOpacity>
    )
}


// --------------- styles --------------- //
const localStyles = StyleSheet.create({

    button: {
        height: measures.BUTTON_HEIGTH,
        backgroundColor:Colors.OLD_GOLD,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    label: {
        ...globalStyles.BUTTON,
        color: Colors.BLACK
    }

})


// --------------- export --------------- //
export default ButtonCmp