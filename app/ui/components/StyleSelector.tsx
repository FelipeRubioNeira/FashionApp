import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { ClothingStyle, ClothingStylesList } from '@/app/domain/Types'
import Colors from '../constants/colors'


// ---------- interfaces ---------- //
interface StyleSelectorPros {
    styleList: typeof ClothingStylesList,
    styleSelected?: ClothingStyle,
    onPress: (selectedValue: ClothingStyle) => void
}

interface ItemChipProps {
    value: ClothingStyle,
    styleSelected?: ClothingStyle,
    onPress: (value: string) => void,
}


// ---------- component ---------- //
const StyleSelector = ({
    styleList,
    styleSelected,
    onPress
}: StyleSelectorPros) => {
    return (

        // espacio que contiene el listado de chips
        <View style={localStyles.container}>

            {/* chip individualmente renderizado */}
            {styleList.map((item, index) => <ChipItem
                key={index}
                value={item}
                styleSelected={styleSelected}
                onPress={() => onPress(item)}
            />)}

        </View>
    )
}

const ChipItem = ({ value, onPress, styleSelected }: ItemChipProps) => {

    if (value === "") return null

    const { itemSelected, itemUnselected, textSelected, textUnselected } = localStyles

    const isSelected = value === styleSelected;
    const containerStyle = isSelected ? itemSelected : itemUnselected;
    const textStyle = isSelected ? textSelected : textUnselected;

    return (
        <TouchableOpacity
            style={[localStyles.itemContainer, containerStyle]}
            onPress={() => onPress(value)}
        >
            <Text style={textStyle}>
                {value}
            </Text>
        </TouchableOpacity>
    )
}


// ---------- stylez ---------- //
const localStyles = StyleSheet.create({

    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
    },
    itemContainer: {
        margin: 4,
        padding: 8,
        borderWidth: 1,
        borderRadius: 8
    },
    itemSelected: {
        backgroundColor: Colors.BLACK,

    },
    itemUnselected: {
        backgroundColor: Colors.WHITE,
    },
    textSelected: {
        color: Colors.WHITE,
    },
    textUnselected: {
        color: Colors.BLACK
    }


})



export default StyleSelector