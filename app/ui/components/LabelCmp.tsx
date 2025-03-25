import { StyleSheet, Text, TextStyle } from 'react-native'
import React from 'react'
import { FONT_SIZE, FONT_FAMILY } from '../constants/fonts';
import Colors from '../constants/colors';


type ILabelCmp = {
    labelValue: string,
    style?: TextStyle
}

const LabelCmp = ({
    labelValue = "",
    style
}: ILabelCmp) => {


    return (
        <Text style={[localStyles.label, style]}>
            {labelValue}
        </Text>
    )
}


const localStyles = StyleSheet.create({

    label: {
        fontSize: FONT_SIZE.LARGE,
        fontFamily: FONT_FAMILY.PLAYFAIR_REGULAR,
        color:Colors.BLACK
    }

})


export default LabelCmp

export type {
    ILabelCmp
}