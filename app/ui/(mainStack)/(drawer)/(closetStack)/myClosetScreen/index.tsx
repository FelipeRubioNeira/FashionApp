import { container } from "tsyringe";
import { View, StyleSheet } from "react-native";
import ScreenCmp from "app/ui/components/ScreenCmp";
import ScrollableImageList from "app/ui/components/ScrollableImageList/ScrollableImageList";
import SpacerCmp from "app/ui/components/SpacerCmp";
import useMyClosetViewModel from "./myClosetViewModel";
import ModalCmp from "app/ui/components/modal/ModalCmp";
import TextInputCmp from "app/ui/components/TextInputCmp";
import IconImage from "app/ui/components/icons/IconImage";
import { dice4, hanger, diskette } from "app/ui/iconImages"
import Colors from "app/ui/constants/colors";
import SearchCmp from "app/ui/components/SearchCmp";
import { GetClothingUseCase, CreateOutfitUseCase } from "@/domain/useCases"
import { Translation, TranslationKeys } from "@/ui/i18n";
import { screenWidth } from "@/ui/constants/screenDimensions";
import SeparatorCmp from "@/ui/components/SeparatorCmp";




// se obtiene la instancia del caso de uso
const getClothingUseCase = container.resolve(GetClothingUseCase);
const creatOutfitUseCase = container.resolve(CreateOutfitUseCase)
const translation = container.resolve(Translation);

const ICON_SIZE = 28



const myCloset = () => {


    // -------------- hooks -------------- //
    const {
        // atributes
        topClothing, bottomClothing, shoes,
        outfitName,
        searchValue,

        topClothingBlocked,
        bottomClothingBlocked,
        shoesBlocked,
        modalProps,

        // methods
        navigateToAddClothing,
        updateCurrentOutfit,
        updateName,
        onPressRandomOutfit,
        onSearchTextChange,
        onDeleteSearch,
        topVisibleClothingId,
        bottomVisibleClothingId,
        shoesVisibleClothingId,
        lockSearch,
        onPressSaveOutfit
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



                    <SeparatorCmp style={{
                        marginBottom: "3%",
                        marginTop: "5%",
                        width: screenWidth * 0.85,
                    }} />

                    {/* agregar prenda y guardar combinacion preferida */}
                    <View style={localStyles.headerAgregarStarContainer}>


                        <IconImage
                            source={hanger}
                            color={Colors.GRAY}
                            size={ICON_SIZE}
                            containerStyle={{ flex: 1, }}
                            onPress={() => navigateToAddClothing(undefined)}
                        />

                        {/* Icono random que genera una combinacion aleatoria de prendas */}
                        <IconImage
                            source={dice4}
                            color={Colors.OLD_GOLD}
                            size={ICON_SIZE}
                            containerStyle={{ flex: 1, }}
                            onPress={onPressRandomOutfit}
                        />

                        <IconImage
                            source={diskette}
                            color={Colors.GRAY}
                            size={ICON_SIZE}
                            containerStyle={{ flex: 1}}
                            onPress={onPressSaveOutfit}
                            
                        />


                    </View>

                    <SeparatorCmp style={{
                        marginTop: "3%",
                        marginBottom: "5%",
                        width: screenWidth * 0.85,
                    }} />


                </View>

                <SpacerCmp marginVertical={4} />

                {/* TOP list */}
                <ScrollableImageList
                    style={{ flex: 3 }}
                    initialValue={topVisibleClothingId}
                    clothingList={topClothing}
                    onPressClothing={navigateToAddClothing}
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
                    onPressClothing={navigateToAddClothing}
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
                    onPressClothing={navigateToAddClothing}
                    onPressDeleteClothing={() => { }}
                    onChangeClothing={clothingId => updateCurrentOutfit("shoes", clothingId)}
                    lockedRow={shoesBlocked}
                    onPressLock={() => lockSearch("shoes")}
                />


            </View>

            <ModalCmp {...modalProps}   >
                <TextInputCmp
                    value={outfitName}
                    placeholder={`${translation.translate(TranslationKeys.saveOutfitPlaceholder)} ...`}
                    onChangeText={updateName}
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
    },
    addClothing: {
        flex: 4,
    }


})

export default myCloset
