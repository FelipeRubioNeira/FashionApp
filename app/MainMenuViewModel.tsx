import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScreenMainMenuParams } from "./ui/navigation/interfaces";
import GetClothingUseCase from "./domain/useCases/GetClothingUseCase";
import { Clothing, ClothingType } from "./domain/Types";
import DeleteClothingUseCase from "./domain/useCases/DeleteClothingUseCase";




const useMainMenuViewModel = (
    getClothingUseCase: GetClothingUseCase,
    deleteClothingUseCase: DeleteClothingUseCase
) => {


    // -------------- hooks -------------- //
    const router = useRouter();
    const { clothingType, imageUri } = useLocalSearchParams<ScreenMainMenuParams>();


    // -------------- state -------------- //
    const [topClothingList, setTopClothingList] = useState<Clothing[]>([])
    const [bottomClothingList, setBottomClothingList] = useState<Clothing[]>([])
    const [shoesList, setShoesList] = useState<Clothing[]>([])





    // -------------- effects -------------- //
    useEffect(() => {
        getAllClothing()
    }, [])

    useEffect(() => {
        getAllClothing(clothingType)
    }, [imageUri])



    // -------------- funtions -------------- //
    const navigateToAddClothing = () => {
        router.navigate("/ui/screens/addClothingScreen")
    }

    const getAllClothing = async (filter?: ClothingType) => {

        console.log("filtro", filter);

        const {
            topClothing,
            bottomClothing,
            shoes
        } = await getClothingUseCase.execute(filter)

        switch (filter) {

            case "Superior":
                setTopClothingList(topClothing)
                break

            case "Inferior":
                setBottomClothingList(bottomClothing)
                break

            case "Zapatos":
                setShoesList(shoes)
                break

            default: // Incluye undefined
                setTopClothingList(topClothing);
                setBottomClothingList(bottomClothing);
                setShoesList(shoes);
                break
        }

    }

    const onPressClothing = (clothing: Clothing) => {
        router.navigate({
            pathname: "/ui/screens/addClothingScreen",
            params: { ...clothing }
        })
    }

    const onPressDeleteClothing = async (clothing: Clothing) => {

        const {
            success,
            message
        } = await deleteClothingUseCase.execute(clothing)

        console.log("onPressDeleteClothing() ", success, message)

        if (success) {
            getAllClothing()
        }


    }


    // -------------- return -------------- //
    return {
        topClothingList,
        bottomClothingList,
        shoesList,

        navigateToAddClothing,
        onPressClothing,
        onPressDeleteClothing
    }

}



export default useMainMenuViewModel;