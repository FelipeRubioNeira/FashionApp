import { StyleSheet, Text, TextInput, TextStyle, View } from 'react-native'
import React, { ReactElement } from 'react'
import { ILabelCmp } from '../navigation/LabelCmp'


interface ITextInputCpm {
    inputValue?: string
    placeholder: string,
    onChangeText: (text: string) => void,
    inputStyle?: TextStyle,
    label?: ReactElement<ILabelCmp>
}

const TextInputCmp = ({
    inputValue = "",
    placeholder = "Ingrese valor",
    onChangeText,
    inputStyle,
    label
}: ITextInputCpm) => {
    return (

        <View style={localStyles.container}>

            {label}

            <TextInput
                value={inputValue}
                onChangeText={onChangeText}
                placeholder={placeholder}
                style={[localStyles.textInputFrame, inputStyle]}
                placeholderTextColor={"gray"}
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
        paddingHorizontal: 8
    }

})



export default TextInputCmp