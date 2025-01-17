import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import LabelCmp from './LabelCmp'

interface IClothingCategoryCmp {
    categoryList: string[],
    onChangeCategory: (itemPress: string) => void,
    selectedValue?: string
}

const ClothingCategoryCmp = ({
    categoryList,
    onChangeCategory,
    selectedValue
}: IClothingCategoryCmp) => {

    return (
        <View style={localStyles.container}>

            {categoryList.map((categoryItem, index) => (
                <Pressable
                    key={index}
                    style={selectedValue !== categoryItem ? localStyles.categoryItemDefault : localStyles.categoryItemSelected}
                    onPress={() => onChangeCategory(categoryItem)}
                >

                    <LabelCmp
                        labelValue={categoryItem}
                        labelStyle={selectedValue !== categoryItem ? localStyles.categoryItemTextDefault : localStyles.categoryItemTextSelected}
                    />
                </Pressable>
            ))}

        </View>
    )
}


const localStyles = StyleSheet.create({

    container: {
        width: '100%',
        height: 60,
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