import { StyleSheet, View } from 'react-native'
import React from 'react'
import ScrollableImageList from 'app/ui/components/ScrollableImageList/ScrollableImageList'
import SpacerCmp from 'app/ui/components/SpacerCmp'
import useEditOutfitViewModel from './editOutfitViewModel'
import ScreenCmp from 'app/ui/components/ScreenCmp'
import ButtonCmp from 'app/ui/components/ButtonCmp'
import { container } from 'tsyringe'
import { EditOutfitUseCase } from '@/domain/useCases'
import SearchCmp from 'app/ui/components/SearchCmp'
import RandomDice from "app/ui/components/icons/IconImage";
import { dice4 } from "app/ui/iconImages"
import Colors from 'app/ui/constants/colors'
import ModalCmp from 'app/ui/components/modal/ModalCmp'
import TextInputCmp from 'app/ui/components/TextInputCmp'
import { Translation, TranslationKeys } from '@/ui/i18n'
import SeparatorCmp from '@/ui/components/SeparatorCmp'






// ----------- inyeccion de depdendencias ----------- //
const editOutfitUseCase = container.resolve(EditOutfitUseCase)
const translation = container.resolve(Translation);




// // --------------- component --------------- //
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
        onSearchTextChange,
        onDeleteSearch,
        topClothingBlocked,
        bottomClothingBlocked,
        shoesBlocked,
        lockSearch,
        onPressRandomOutfit,
        onPressCancel,
        outfitName,
        updateName,
        openModal,
        modal
    } = useEditOutfitViewModel(editOutfitUseCase)



    return (
        <ScreenCmp style={{ padding: 0 }}>

            <View style={localStyles.headerContainer}>

                <SearchCmp
                    value={searchValue}
                    onChangeText={onSearchTextChange}
                    onDeleteSearch={onDeleteSearch}

                />

                <SpacerCmp marginHorizontal={"2%"} />

                <RandomDice
                    source={dice4}
                    color={Colors.OLD_GOLD}
                    size={34}
                    onPress={onPressRandomOutfit}
                />
            </View>


            <SeparatorCmp style={{ marginVertical: "4%" }} />

            <ScrollableImageList
                style={{ flex: 3 }}
                initialValue={topVisibleClothingId}
                clothingList={topClothing}
                onPressClothing={() => { }}
                onPressDeleteClothing={() => { }}
                onChangeClothing={clothingId => updateCurrentOutfit("top", clothingId)}
                lockedRow={topClothingBlocked}
                onPressLock={() => lockSearch("top")}

            />

            <SpacerCmp marginVertical={4} />


            {/* Bottom list  */}
            <ScrollableImageList
                style={{ flex: 3 }}
                initialValue={bottomVisibleClothingId}
                clothingList={bottomClothing}
                onPressClothing={() => { }}
                onPressDeleteClothing={() => { }}
                onChangeClothing={clothingId => updateCurrentOutfit("bottom", clothingId)}
                lockedRow={bottomClothingBlocked}
                onPressLock={() => lockSearch("bottom")}
            />

            <SpacerCmp marginVertical={4} />


            {/* Shoes list  */}
            <ScrollableImageList
                style={{ flex: 1 }}
                initialValue={shoesVisibleClothingId}
                clothingList={shoes}
                onPressClothing={() => { }}
                onPressDeleteClothing={() => { }}
                onChangeClothing={clothingId => updateCurrentOutfit("shoes", clothingId)}
                lockedRow={shoesBlocked}
                onPressLock={() => lockSearch("shoes")}
            />


            <SeparatorCmp style={{ marginVertical: "4%" }} />


            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 8 }}>

                <ButtonCmp
                    text={translation.translate(TranslationKeys.cancelButton)}
                    onPress={onPressCancel}
                    textStyle={{ color: Colors.WHITE }}
                    style={{ flex: 1, backgroundColor: Colors.DANGER }}
                />

                <SpacerCmp marginHorizontal={4} />

                <ButtonCmp
                    text={translation.translate(TranslationKeys.saveButton)}
                    onPress={openModal}
                    textStyle={{ color: Colors.WHITE }}
                    style={{ flex: 1, backgroundColor: Colors.BLACK }}
                />

            </View>


            <ModalCmp {...modal.config}>
                <TextInputCmp
                    value={outfitName}
                    onChangeText={updateName}
                    placeholder={`${translation.translate(TranslationKeys.saveOutfitPlaceholder)} ...`}
                />
            </ModalCmp>

        </ScreenCmp>
    )
}


const localStyles = StyleSheet.create({

    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 8
    }

})

export default index