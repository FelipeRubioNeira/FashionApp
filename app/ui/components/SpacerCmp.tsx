import { ImageStyle, StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface ISpacerCmp {
    marginHorizontal?: number,
    marginVertical?: number,

}

const SpacerCmp = ({
    marginHorizontal,
    marginVertical
}: ISpacerCmp) => {

    return (
        <View style={{
            marginHorizontal: marginHorizontal,
            marginVertical: marginVertical,
        }}
        />
    )
}

export default SpacerCmp
