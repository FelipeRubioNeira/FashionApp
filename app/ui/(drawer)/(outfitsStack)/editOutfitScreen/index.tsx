import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScrollableImageList from '@/ui/components/ScrollableImageList/ScrollableImageList'
import SpacerCmp from '@/ui/components/SpacerCmp'
import useEditOutfitViewModel from './editOutfitViewModel'
import ScreenCmp from '@/ui/components/ScreenCmp'
import ButtonCmp from '@/ui/components/ButtonCmp'


const index = () => {

    const {
        topClothing,
        bottomClothing,
        shoes,

        updateCurrentOutfit,
    } = useEditOutfitViewModel()


    return (
        <ScreenCmp>
            <ScrollableImageList
                style={{ flex: 3 }}
                clothingList={topClothing}
                onPressClothing={() => { }}
                onPressDeleteClothing={() => { }}
                onChangeClothing={clothingId => updateCurrentOutfit("Superior", clothingId)}
            />

            <SpacerCmp marginVertical={4} />


            {/* Bottom list  */}
            <ScrollableImageList
                style={{ flex: 3 }}
                clothingList={bottomClothing}
                onPressClothing={() => { }}
                onPressDeleteClothing={() => { }}
                onChangeClothing={clothingId => updateCurrentOutfit("Inferior", clothingId)}
            />

            <SpacerCmp marginVertical={4} />


            {/* Shoes list  */}
            <ScrollableImageList
                style={{ flex: 1 }}
                clothingList={shoes}
                onPressClothing={() => { }}
                onPressDeleteClothing={() => { }}
                onChangeClothing={clothingId => updateCurrentOutfit("Zapatos", clothingId)}
            />

            <SpacerCmp marginVertical={4} />

            <ButtonCmp text='Guardar' onPress={() => { }} />

        </ScreenCmp>
    )
}


const localStyles = StyleSheet.create({

})


export default index