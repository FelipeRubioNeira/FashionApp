import { View } from 'react-native'
import React from 'react'
import ScrollableImageList from 'app/ui/components/ScrollableImageList/ScrollableImageList'
import SpacerCmp from 'app/ui/components/SpacerCmp'
import useEditOutfitViewModel from './editOutfitViewModel'
import ScreenCmp from 'app/ui/components/ScreenCmp'
import ButtonCmp from 'app/ui/components/ButtonCmp'
import { container } from 'tsyringe'
import {EditOutfitUseCase} from '@/domain/useCases'
import SearchCmp from 'app/ui/components/SearchCmp'
import RandomDice from "app/ui/components/icons/IconImage";
import { dice5 } from "app/ui/iconImages"
import Colors from 'app/ui/constants/colors'
import ModalCmp from 'app/ui/components/modal/ModalCmp'
import TextInputCmp from 'app/ui/components/TextInputCmp'


// ----------- inyeccion de depdendencias ----------- //
const editOutfitUseCase = container.resolve(EditOutfitUseCase)


const index = () => {

    const {
        searchValue,
        topVisibleClothingId,
        bottomVisibleClothingId,
        shoesVisibleClothingId,
        topClothing,
        bottomClothing,
        shoes,

        updateCurrentOutfit,
        onPressUpdateOutfit,
        updateOutfitName,
        onSearchTextChange,
        onDeleteSearch,
        topClothingBlocked,
        bottomClothingBlocked,
        shoesBlocked,
        lockSearch,
        onPressRandomOutfit,
        onPressCancel,
        showModal,
        modalVisible,
        modalTitle,
        ModalButtonList,
        outfitName,
        hideModal,
        updateName,
    } = useEditOutfitViewModel(editOutfitUseCase)



    return (
        <ScreenCmp style={{ padding: 0 }}>

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 8 }}>
                <SearchCmp
                    value={searchValue}
                    onChangeText={onSearchTextChange}
                    onDeleteSearch={onDeleteSearch}
                />

                <SpacerCmp marginHorizontal={4} />

                <RandomDice
                    source={dice5}
                    color={Colors.BLACK}
                    size={34}
                    onPress={onPressRandomOutfit}
                />
            </View>

            <SpacerCmp marginVertical={4} />


            <ScrollableImageList
                style={{ flex: 3 }}
                initialValue={topVisibleClothingId}
                clothingList={topClothing}
                onPressClothing={() => { }}
                onPressDeleteClothing={() => { }}
                onChangeClothing={clothingId => updateCurrentOutfit("Superior", clothingId)}
                lockedRow={topClothingBlocked}
                onPressLock={() => lockSearch("Superior")}

            />

            <SpacerCmp marginVertical={4} />


            {/* Bottom list  */}
            <ScrollableImageList
                style={{ flex: 3 }}
                initialValue={bottomVisibleClothingId}
                clothingList={bottomClothing}
                onPressClothing={() => { }}
                onPressDeleteClothing={() => { }}
                onChangeClothing={clothingId => updateCurrentOutfit("Inferior", clothingId)}
                lockedRow={bottomClothingBlocked}
                onPressLock={() => lockSearch("Inferior")}
            />

            <SpacerCmp marginVertical={4} />


            {/* Shoes list  */}
            <ScrollableImageList
                style={{ flex: 1 }}
                initialValue={shoesVisibleClothingId}
                clothingList={shoes}
                onPressClothing={() => { }}
                onPressDeleteClothing={() => { }}
                onChangeClothing={clothingId => updateCurrentOutfit("Zapatos", clothingId)}
                lockedRow={shoesBlocked}
                onPressLock={() => lockSearch("Zapatos")}
            />

            <SpacerCmp marginVertical={4} />

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 8 }}>

                <ButtonCmp
                    text='Guardar'
                    onPress={showModal}
                    style={{ flex: 1, }}
                />

                <SpacerCmp marginHorizontal={4} />

                <ButtonCmp
                    text='Cancelar'
                    onPress={onPressCancel}
                    style={{ flex: 1 }}
                />


            </View>


            <ModalCmp
                visible={modalVisible}
                title={modalTitle}
                buttonList={ModalButtonList}
                hide={hideModal}
            >
                <TextInputCmp
                    value={outfitName}
                    onChangeText={updateName}
                    placeholder="Ingrese nombre de la combinación"
                />
            </ModalCmp>

        </ScreenCmp>
    )
}




export default index