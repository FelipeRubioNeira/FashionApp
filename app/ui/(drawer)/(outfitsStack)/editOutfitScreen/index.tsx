import { StyleSheet } from 'react-native'
import React from 'react'
import ScrollableImageList from '@/ui/components/ScrollableImageList/ScrollableImageList'
import SpacerCmp from '@/ui/components/SpacerCmp'
import useEditOutfitViewModel from './editOutfitViewModel'
import ScreenCmp from '@/ui/components/ScreenCmp'
import ButtonCmp from '@/ui/components/ButtonCmp'
import { container } from 'tsyringe'
import EditOutfitUseCase from '@/domain/useCases/EditOutfitUseCase'
import TextInputCmp from '@/ui/components/TextInputCmp'


// ----------- inyeccion de depdendencias ----------- //
const editOutfitUseCase = container.resolve(EditOutfitUseCase)


const index = () => {

    const {
        initialOutfit,
        currentOutfit,
        topClothing,
        bottomClothing,
        shoes,

        updateCurrentOutfit,
        onPressUpdateOutfit,
        updateOutfitName,
    } = useEditOutfitViewModel(editOutfitUseCase)

    const { topId, bottomId, shoesId } = initialOutfit


    return (
        <ScreenCmp>


            <TextInputCmp
                label='Nombre del outfit'
                value={currentOutfit.name}
                onChangeText={updateOutfitName}
            />

            <ScrollableImageList
                style={{ flex: 3 }}
                initialValue={topId}
                clothingList={topClothing}
                onPressClothing={() => { }}
                onPressDeleteClothing={() => { }}
                onChangeClothing={clothingId => updateCurrentOutfit("Superior", clothingId)}
            />

            <SpacerCmp marginVertical={4} />


            {/* Bottom list  */}
            <ScrollableImageList
                style={{ flex: 3 }}
                initialValue={bottomId}
                clothingList={bottomClothing}
                onPressClothing={() => { }}
                onPressDeleteClothing={() => { }}
                onChangeClothing={clothingId => updateCurrentOutfit("Inferior", clothingId)}
            />

            <SpacerCmp marginVertical={4} />


            {/* Shoes list  */}
            <ScrollableImageList
                style={{ flex: 1 }}
                initialValue={shoesId}
                clothingList={shoes}
                onPressClothing={() => { }}
                onPressDeleteClothing={() => { }}
                onChangeClothing={clothingId => updateCurrentOutfit("Zapatos", clothingId)}
            />

            <SpacerCmp marginVertical={4} />

            <ButtonCmp text='Guardar' onPress={() => onPressUpdateOutfit(currentOutfit)} />

        </ScreenCmp>
    )
}




export default index