import "../../../../di/Container"
import { container } from "tsyringe";
import { View, StyleSheet } from "react-native";
import ScreenCmp from "@/app/ui/components/ScreenCmp";
import ScrollableImageList from "@/app/ui/components/ScrollableImageList/ScrollableImageList";
import SpacerCmp from "@/app/ui/components/SpacerCmp";
import ButtonCmp from "@/app/ui/components/ButtonCmp";
import StarIcn from "@/app/ui/components/icons/StarIcn";
import GetClothingUseCase from "@/app/domain/useCases/GetClothingUseCase";
import useMyClosetViewModel from "./myClosetViewModel";
import DeleteClothingUseCase from "@/app/domain/useCases/DeleteClothingUseCase";
import CreateOutfitUseCase from "@/app/domain/useCases/CreateOutfitUseCase";


// se obtiene la instancia del caso de uso
const getClothingUseCase = container.resolve(GetClothingUseCase);
const deleteClothingUseCase = container.resolve(DeleteClothingUseCase)
const creatOutfitUseCase = container.resolve(CreateOutfitUseCase)



const myCloset = () => {

    const {
        // atributes
        topClothingList,
        bottomClothingList,
        shoesList,

        // methods
        navigateToAddClothing,
        onPressDeleteClothing,
        updateCurrentOutfit,
        onPressSaveOutfit
    } = useMyClosetViewModel(
        getClothingUseCase,
        deleteClothingUseCase,
        creatOutfitUseCase,
    )



    return (
        <ScreenCmp>
            <View style={localStyles.screen}>


                {/* agregar prenda y guardar combinacion preferida */}
                <View style={localStyles.headerAgregarStarContainer}>
                    <ButtonCmp
                        style={{ height: "100%", flex: 4, }}
                        text="Agregar prenda"
                        onPress={navigateToAddClothing}
                    />

                    <View style={{ flex: 1 }}></View>

                    <StarIcn size={34} onPress={onPressSaveOutfit} />
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
                    style={{ flex: 3 }}
                    clothingList={topClothingList}
                    onPressClothing={navigateToAddClothing}
                    onPressDeleteClothing={onPressDeleteClothing}
                    onChangeClothing={clothingId => updateCurrentOutfit("Superior", clothingId)}
                />

                <SpacerCmp marginVertical={4} />


                {/* Bottom list  */}
                <ScrollableImageList
                    style={{ flex: 3 }}
                    clothingList={bottomClothingList}
                    onPressClothing={navigateToAddClothing}
                    onPressDeleteClothing={onPressDeleteClothing}
                    onChangeClothing={clothingId => updateCurrentOutfit("Inferior", clothingId)}
                />

                <SpacerCmp marginVertical={4} />


                {/* Shoes list  */}
                <ScrollableImageList
                    style={{ flex: 1 }}
                    clothingList={shoesList}
                    onPressClothing={navigateToAddClothing}
                    onPressDeleteClothing={onPressDeleteClothing}
                    onChangeClothing={clothingId => updateCurrentOutfit("Zapatos", clothingId)}
                />


            </View>
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
        height: 60
    }


})

export default myCloset
