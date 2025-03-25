import { StyleSheet, TextInput, TextStyle, View } from 'react-native'
import React from 'react'
import LabelCmp from './LabelCmp'
import Colors from '../constants/colors'
import { FONT_FAMILY, FONT_SIZE } from '../constants/fonts'
import measures from '../constants/measures'
import globalStyles from '../constants/globalStyles/globalStyles'


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
                placeholderTextColor={Colors.GRAY_TRANSPARENT}
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
        width: '100%',
        borderWidth: .2,
        borderColor: Colors.GRAY,
        borderRadius: 10,
        height: measures.BUTTON_HEIGTH,
        paddingHorizontal: 8,
        fontSize: FONT_SIZE.SMALL,
        fontFamily: FONT_FAMILY.POPPINS_LIGHT,
        backgroundColor: Colors.WHITE,
        ...globalStyles.SHADOW
    }

})



export default TextInputCmp