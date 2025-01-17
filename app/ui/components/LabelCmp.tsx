import { StyleSheet, Text, TextStyle, View } from 'react-native'
import React from 'react'

interface ILabelCmp {
    labelValue: string,
    labelStyle?: TextStyle
}

const LabelCmp = ({
    labelValue = "",
    labelStyle
}: ILabelCmp) => {

    return (
        <Text style={[localStyles.label, labelStyle]}>
            {labelValue}
        </Text>

    )
}


const localStyles = StyleSheet.create({

    label: {
        fontWeight: 'bold',
        fontSize: 18,
    }

})


export default LabelCmp

export type {
    ILabelCmp
}