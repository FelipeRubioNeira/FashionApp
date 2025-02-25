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





    // -------------- effects -------------- //
    useEffect(() => {
        getAllClothing()
    }, [])

    useEffect(() => {
        getSpecificClothing(clothingType)
    }, [imageUri])



    // -------------- funtions -------------- //
    const navigateToAddClothing = () => {
        router.navigate("/ui/screens/addClothingScreen")
    }

    const getAllClothing = async () => {
        const {
            topClothing,
            bottomClothing,
            shoes
        } = await getClothingUseCase.execute()

        setTopClothingList(topClothing)

    }

    const getSpecificClothing = async (clothingType: ClothingType) => {

        const {
            topClothing,
            bottomClothing,
            shoes
        } = await getClothingUseCase.execute(clothingType)

        if (topClothing.length > 0) {
            setTopClothingList(topClothing)
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
        navigateToAddClothing,
        topClothingList,
        onPressClothing,
        onPressDeleteClothing
    }

}



export default useMainMenuViewModel;