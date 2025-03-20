import { container } from "tsyringe";
import { View, StyleSheet } from "react-native";
import ScreenCmp from "app/ui/components/ScreenCmp";
import ScrollableImageList from "app/ui/components/ScrollableImageList/ScrollableImageList";
import SpacerCmp from "app/ui/components/SpacerCmp";
import ButtonCmp from "app/ui/components/ButtonCmp";
import StarIcn from "app/ui/components/icons/StarIcn";
import useMyClosetViewModel from "./myClosetViewModel";
import ModalCmp from "app/ui/components/modal/ModalCmp";
import TextInputCmp from "app/ui/components/TextInputCmp";
import RandomDice from "app/ui/components/icons/IconImage";
import { dice5 } from "app/ui/iconImages"
import Colors from "app/ui/constants/colors";
import SearchCmp from "app/ui/components/SearchCmp";
import { GetClothingUseCase, CreateOutfitUseCase } from "@/domain/useCases"
import { Translation } from "@/ui/localization/Translation";
import {TranslationKeys}  from "@/ui/localization/keys";


// se obtiene la instancia del caso de uso
const getClothingUseCase = container.resolve(GetClothingUseCase);
const creatOutfitUseCase = container.resolve(CreateOutfitUseCase)
const translation = container.resolve(Translation);





const myCloset = () => {


    // -------------- hooks -------------- //
    const {
        // atributes
        topClothing, bottomClothing, shoes,
        outfitName,
        modalTitle,
        modalVisible,
        ModalButtonList,
        searchValue,

        topClothingBlocked,
        bottomClothingBlocked,
        shoesBlocked,

        // methods
        navigateToAddClothing,
        updateCurrentOutfit,
        showModal,
        updateName,
        hideModal,
        onPressRandomOutfit,
        onSearchTextChange,
        onDeleteSearch,
        topVisibleClothingId,
        bottomVisibleClothingId,
        shoesVisibleClothingId,
        lockSearch,
    } = useMyClosetViewModel(
        getClothingUseCase,
        creatOutfitUseCase,
    )




    return (
        <ScreenCmp style={{ padding: 0 }}>
            <View style={localStyles.screen}>


                <View style={{ padding: 8 }}>


                    {/* componente que permite buscar prendas en la base de datos */}
                    <SearchCmp
                        value={searchValue}
                        onChangeText={onSearchTextChange}
                        onDeleteSearch={onDeleteSearch}
                    />


                    <SpacerCmp marginVertical={4} />


                    {/* agregar prenda y guardar combinacion preferida */}
                    <View style={localStyles.headerAgregarStarContainer}>
                        <ButtonCmp
                            style={localStyles.addClothing}
                            text={translation.translate(TranslationKeys.addClothing)}
                            onPress={() => navigateToAddClothing(undefined)}
                        />

                        <View style={{ flex: 1 }}></View>


                        {/* Icono random que genera una combinacion aleatoria de prendas */}
                        <RandomDice
                            source={dice5}
                            color={Colors.BLACK}
                            size={34}
                            onPress={onPressRandomOutfit}
                        />

                        <StarIcn size={34} onPress={showModal} />

                    </View>


                </View>

                <SpacerCmp marginVertical={4} />

                {/* TOP list */}
                <ScrollableImageList
                    style={{ flex: 3 }}
                    initialValue={topVisibleClothingId}
                    clothingList={topClothing}
                    onPressClothing={navigateToAddClothing}
                    onPressDeleteClothing={() => { }}
                    lockedRow={topClothingBlocked}
                    onChangeClothing={clothingId => updateCurrentOutfit("Superior", clothingId)}
                    onPressLock={() => lockSearch("Superior")}
                />

                <SpacerCmp marginVertical={4} />


                {/* Bottom list  */}
                <ScrollableImageList
                    style={{ flex: 3 }}
                    initialValue={bottomVisibleClothingId}
                    clothingList={bottomClothing}
                    onPressClothing={navigateToAddClothing}
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
                    onPressClothing={navigateToAddClothing}
                    onPressDeleteClothing={() => { }}
                    lockedRow={shoesBlocked}
                    onChangeClothing={clothingId => updateCurrentOutfit("Zapatos", clothingId)}
                    onPressLock={() => lockSearch("Zapatos")}
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

const localStyles = StyleSheet.create({

    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    headerAgregarStarContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        height: 60,
    },
    addClothing: {
        height: "100%",
        flex: 4,
    }


})

export default myCloset
