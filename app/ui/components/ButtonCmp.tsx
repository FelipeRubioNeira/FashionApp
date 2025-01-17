import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native'
import React from 'react'


// --------------- types --------------- //
interface ButtonCmpProps {
    onPress: () => void,
    text: string,
    style?: StyleProp<ViewStyle>
}

// --------------- component --------------- //
const ButtonCmp = ({ onPress, text, style }: ButtonCmpProps) => {
    return (
        <Pressable
            style={[localStyles.button, style]}
            onPress={onPress}
        >
            <Text>{text}</Text>

        </Pressable>
    )
}


// --------------- styles --------------- //
const localStyles = StyleSheet.create({

    button: {
        borderWidth: 1,
        borderRadius: 10,
        height: 70,
        justifyContent: "center",
        alignItems: "center"
    }

})


// --------------- export --------------- //
export default ButtonCmp