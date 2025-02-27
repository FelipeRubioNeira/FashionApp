import "./di/Container"
import { container } from "tsyringe";
import { View, StyleSheet } from "react-native";
import ScreenCmp from "./ui/components/ScreenCmp";
import ScrollableImageList from "./ui/components/ScrollableImageList/ScrollableImageList";
import SearchCmp from "./ui/components/SearchCmp";
import SpacerCmp from "./ui/components/SpacerCmp";
import ButtonCmp from "./ui/components/ButtonCmp";
import StarIcn from "./ui/components/icons/StarIcn";
import GetClothingUseCase from "./domain/useCases/GetClothingUseCase";
import useMainMenuViewModel from "./MainMenuViewModel";
import DeleteClothingUseCase from "./domain/useCases/DeleteClothingUseCase";


// se obtiene la instancia del caso de uso
const getClothingUseCase = container.resolve(GetClothingUseCase);
const deleteClothingUseCase = container.resolve(DeleteClothingUseCase)



const MyCloset = () => {

    const {
        // atributes
        topClothingList,
        bottomClothingList,
        shoesList,

        // methods
        navigateToAddClothing,
        onPressClothing,
        onPressDeleteClothing
    } = useMainMenuViewModel(getClothingUseCase, deleteClothingUseCase)



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

                    <StarIcn size={34} onPress={() => { }} />
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
                    style={{ flex: 2 }}
                    clothingList={topClothingList}
                    onPressClothing={onPressClothing}
                    onPressDeleteClothing={onPressDeleteClothing}
                />

                <SpacerCmp marginVertical={4} />


                {/* view para la parte inferior de la ropa */}
                <ScrollableImageList
                    style={{ flex: 2 }}
                    clothingList={bottomClothingList}
                    onPressClothing={onPressClothing}
                    onPressDeleteClothing={onPressDeleteClothing}
                />

                <SpacerCmp marginVertical={4} />


                {/* view para la parte zapatos */}
                <ScrollableImageList
                    style={{ flex: 1 }}
                    clothingList={shoesList}
                    onPressClothing={onPressClothing}
                    onPressDeleteClothing={onPressDeleteClothing}
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

export default MyCloset
