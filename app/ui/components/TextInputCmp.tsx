import { StyleSheet, TextInput, TextStyle, View } from 'react-native'
import React from 'react'
import LabelCmp from './LabelCmp'


type TextInputCpm = {
    placeholder?: string,
    value?: string
    style?: TextStyle,
    label?: string,
    maxLength?: number,
    multiline?: boolean,
    onChangeText: (text: string) => void,
}

const TextInputCmp = ({
    value = "",
    placeholder = "Ingrese valor",
    style,
    label,
    maxLength = 50,
    multiline = false,
    onChangeText,
}: TextInputCpm) => {
    return (

        <View style={localStyles.container}>

            {label && <LabelCmp labelValue={label} style={{ fontSize: 12 }} />}

            <TextInput
                style={[localStyles.textInputFrame, style]}
                placeholderTextColor={"gray"}
                maxLength={maxLength}
                multiline={multiline}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
            />

        </View>
    )
}


const localStyles = StyleSheet.create({

    container: {
        marginVertical: 8
    },

    textInputFrame: {
        marginTop: 8,
        width: '100%',
        borderWidth: 1,
        borderRadius: 10,
        height: 60,
        paddingHorizontal: 8,
    }

})



export default TextInputCmp