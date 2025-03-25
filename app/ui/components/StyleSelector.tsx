import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ClothingStyle, ClothingStylesList } from '@/domain/types/Types'
import Colors from '../constants/colors'
import { container } from 'tsyringe';
import { Translation } from '../i18n';
import LabelCmp from './LabelCmp';
import { FONT_FAMILY, FONT_SIZE } from '../constants/fonts';
import measures from '../constants/measures';

const translation = container.resolve(Translation);


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
            <LabelCmp
                style={{...localStyles.defaultText, ...textStyle}}
                labelValue={translation.translate(value)}
            />
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
        borderColor:Colors.GRAY_TRANSPARENT,
        borderRadius: 8,
        height: measures.BUTTON_HEIGTH * 0.7,
        justifyContent: "center",
        alignItems: "center",
    },
    itemSelected: {
        backgroundColor: Colors.BLACK,
        borderWidth:0
    },
    itemUnselected: {
        backgroundColor: Colors.SAND,
    },

    defaultText: {
        fontSize: FONT_SIZE.MEDIUM,
        fontFamily: FONT_FAMILY.POPPINS_LIGHT
    },
    textSelected: {
        color: Colors.WHITE,
    },
    textUnselected: {
        color: Colors.BLACK
    },


})



export default StyleSelector