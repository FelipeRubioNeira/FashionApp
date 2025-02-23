import { DimensionValue, View } from 'react-native'
import React from 'react'

interface ISpacerCmp {
    marginHorizontal?: DimensionValue,
    marginVertical?: DimensionValue,

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
