import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LabelCmp from '../navigation/LabelCmp'
import { ClothingType } from '@/app/domain/Types'

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
                        style={selectedValue !== categoryItem ? localStyles.categoryItemDefault : localStyles.categoryItemSelected}
                        onPress={() => onChangeCategory(categoryItem)}
                    >

                        <LabelCmp
                            labelValue={categoryItem}
                            labelStyle={selectedValue !== categoryItem ? localStyles.categoryItemTextDefault : localStyles.categoryItemTextSelected}
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
        height: 50,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    categoryItemDefault: {
        backgroundColor: "white",
        flex: 1,
        borderWidth: 1,
        height: "100%",
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

    // se usa cuando se quiere cambiar el estilo del boton selccionado
    categoryItemSelected: {
        backgroundColor: "black",
        flex: 1,
        borderWidth: 1,
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