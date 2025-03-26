import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LabelCmp from './LabelCmp'
import { ClothingType } from '@/domain/types/Types'
import { container } from 'tsyringe';
import { Translation } from '../i18n';
import globalStyles from '../constants/globalStyles/globalStyles';
import measures from '../constants/measures';
import Colors from '../constants/colors';

const translation = container.resolve(Translation);


interface IClothingCategoryCmp {
    categoryList: ClothingType[],
    onChangeCategory: (itemPress: ClothingType) => void,
    selectedValue?: ClothingType
}

const ClothingCategoryCmp = ({
    categoryList,
    onChangeCategory,
    selectedValue
}: IClothingCategoryCmp) => {


    return (
        <View style={localStyles.container}>

            {categoryList.map((categoryItem, index) => {

                if (categoryItem === "") return null

                return (
                    <TouchableOpacity
                        key={index}
                        style={{
                            ...localStyles.categoryBase,
                            ...(
                                selectedValue !== categoryItem ?
                                    localStyles.categoryItemDefault
                                    : localStyles.categoryItemSelected
                            )
                        }}
                        onPress={() => onChangeCategory(categoryItem)}
                    >

                        <LabelCmp
                            labelValue={translation.translate(categoryItem)}
                            style={{
                                ...globalStyles.BUTTON,
                                ...(
                                    selectedValue !== categoryItem ?
                                        localStyles.categoryItemTextDefault
                                        : localStyles.categoryItemTextSelected
                                )
                            }}
                        />

                    </TouchableOpacity>
                )
            })}

        </View>
    )
}

const localStyles = StyleSheet.create({

    container: {
        width: '100%',
        height: measures.BUTTON_HEIGTH,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    categoryBase:{
        borderWidth:1,
        borderColor:Colors.GRAY_TRANSPARENT,
        height:measures.BUTTON_HEIGTH * 0.9,
    },
    categoryItemDefault: {
        flex: 1,
        marginHorizontal: 2,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    categoryItemTextDefault: {
        textAlign: "center",
        verticalAlign: "middle",
        color: "black"
    },

    categoryItemSelected: {
        backgroundColor: "black",
        flex: 1,
        borderWidth: 0,
        height: "100%",
        marginHorizontal: 2,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    categoryItemTextSelected: {
        textAlign: "center",
        verticalAlign: "middle",
        color: "white"
    }

})



export default ClothingCategoryCmp