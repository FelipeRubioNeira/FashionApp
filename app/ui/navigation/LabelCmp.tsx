import { StyleSheet, Text, TextStyle, View } from 'react-native'
import React from 'react'

interface ILabelCmp {
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
        fontWeight: 'bold',
        fontSize: 18,
    }

})


export default LabelCmp

export type {
    ILabelCmp
}