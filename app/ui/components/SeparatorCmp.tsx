import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { screenWidth } from '../constants/screenDimensions'
import Colors from '../constants/colors'


type SeparatorCmpProps = {
    style:ViewStyle
}

const SeparatorCmp = ({
    style = {},
}: SeparatorCmpProps) => {
    return (
        <View style={[
            localStyles.default,
            style,
        ]} />
    )
}

export default SeparatorCmp

const localStyles = StyleSheet.create({

    default: {
        width: screenWidth * 0.9,
        alignSelf: "center",
        borderTopWidth: 0.4,
        borderColor: Colors.GRAY_TRANSPARENT,
    }

})