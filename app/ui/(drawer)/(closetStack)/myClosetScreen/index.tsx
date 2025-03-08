import { container } from "tsyringe";
import "@/di/Container"
import { View, StyleSheet } from "react-native";
import ScreenCmp from "@/ui/components/ScreenCmp";
import ScrollableImageList from "@/ui/components/ScrollableImageList/ScrollableImageList";
import SpacerCmp from "@/ui/components/SpacerCmp";
import ButtonCmp from "@/ui/components/ButtonCmp";
import StarIcn from "@/ui/components/icons/StarIcn";
import GetClothingUseCase from "@/domain/useCases/GetClothingUseCase";
import useMyClosetViewModel from "./myClosetViewModel";
import CreateOutfitUseCase from "@/domain/useCases/CreateOutfitUseCase";
import ModalCmp from "@/ui/components/modal/ModalCmp";
import TextInputCmp from "@/ui/components/TextInputCmp";
import RandomDice from "@/ui/components/icons/IconImage";
import { dice5 } from "@/ui/iconImages"
import Colors from "@/ui/constants/colors";
import addClothing from "../addClothingScreen";

// se obtiene la instancia del caso de uso
const getClothingUseCase = container.resolve(GetClothingUseCase);
const creatOutfitUseCase = container.resolve(CreateOutfitUseCase)



const myCloset = () => {

    const {
        // atributes
        topClothing, bottomClothing, shoes,
        outfitName,
        modalTitle,
        modalVisible,
        ModalButtonList,
        currentOutfit,

        // methods
        navigateToAddClothing,
        updateCurrentOutfit,
        showModal,
        updateName,
        hideModal,
        onPressRandomOutfit
    } = useMyClosetViewModel(
        getClothingUseCase,
        creatOutfitUseCase,
    )



    return (
        <ScreenCmp>
            <View style={localStyles.screen}>


                {/* agregar prenda y guardar combinacion preferida */}
                <View style={localStyles.headerAgregarStarContainer}>
                    <ButtonCmp
                        style={localStyles.addClothing}
                        text="Agregar prenda"
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


                <SpacerCmp marginVertical={4} />

                {/**
                 * De momento esto se comenta
                 */}
                {/* componente que permite buscar prendas en la base de datos */}
                {/* <SearchCmp
                    onSearch={() => console.log("Se ha llamado a buscar en index ")}
                    onChangeText={value => console.log("se ha presionado sobre buscar ", value)}
                />

                <SpacerCmp marginVertical={4} /> */}

                {/* TOP list */}
                <ScrollableImageList
                    initialValue={currentOutfit.topId}
                    style={{ flex: 3 }}
                    clothingList={topClothing}
                    onPressClothing={navigateToAddClothing}
                    onPressDeleteClothing={() => { }}
                    onChangeClothing={clothingId => updateCurrentOutfit("Superior", clothingId)}
                />

                <SpacerCmp marginVertical={4} />


                {/* Bottom list  */}
                <ScrollableImageList
                    style={{ flex: 3 }}
                    initialValue={currentOutfit.bottomId}
                    clothingList={bottomClothing}
                    onPressClothing={navigateToAddClothing}
                    onPressDeleteClothing={() => { }}
                    onChangeClothing={clothingId => updateCurrentOutfit("Inferior", clothingId)}
                />

                <SpacerCmp marginVertical={4} />


                {/* Shoes list  */}
                <ScrollableImageList
                    style={{ flex: 1 }}
                    initialValue={currentOutfit.shoesId}
                    clothingList={shoes}
                    onPressClothing={navigateToAddClothing}
                    onPressDeleteClothing={() => { }}
                    onChangeClothing={clothingId => updateCurrentOutfit("Zapatos", clothingId)}
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
