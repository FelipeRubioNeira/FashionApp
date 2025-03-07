import { StyleSheet, TextInput, TextStyle, View } from 'react-native'
import React from 'react'
import LabelCmp from './LabelCmp'


interface ITextInputCpm {
    onChangeText: (text: string) => void,
    placeholder?: string,
    value?: string
    style?: TextStyle,
    label?: string,
    maxLength?: number,
    multiline?: boolean,
}

const TextInputCmp = ({
    value = "",
    placeholder = "Ingrese valor",
    onChangeText,
    style,
    label,
    maxLength = 50,
    multiline = false,
}: ITextInputCpm) => {
    return (

        <View style={localStyles.container}>

            {label && <LabelCmp labelValue={label} style={{ fontSize: 12 }} />}

            <TextInput
                style={[localStyles.textInputFrame, style]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={"gray"}
                maxLength={maxLength}
                multiline={multiline}
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