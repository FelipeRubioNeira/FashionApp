import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScreenMainMenuParams } from "./ui/navigation/interfaces";
import GetClothingUseCase from "./domain/useCases/GetClothingUseCase";
import { Clothing, ClothingType } from "./domain/Types";




const useMainMenuViewModel = (getClothingUseCase: GetClothingUseCase) => {


    // -------------- hooks -------------- //
    const router = useRouter();
    const { clothingType } = useLocalSearchParams<ScreenMainMenuParams>();



    // -------------- state -------------- //
    const [topClothingList, setTopClothingList] = useState<Clothing[]>([])



    // -------------- effects -------------- //
    useEffect(() => {
        getAllClothing()
    }, [])

    useEffect(() => {
        getSpecificClothing(clothingType)
    }, [clothingType])



    // -------------- funtions -------------- //
    const navigateToAddClothing = () => {
        router.navigate("/ui/screens/addClothingScreen")
    }

    const getAllClothing = async () => {
        const clothingList = await getClothingUseCase.execute()
        setTopClothingList(clothingList)
    }

    const getSpecificClothing = async (clothingType: ClothingType) => {
        const clothingList = await getClothingUseCase.execute(clothingType)
        setTopClothingList(clothingList)
    }


    // -------------- return -------------- //
    return {
        navigateToAddClothing,
        topClothingList
    }

}



export default useMainMenuViewModel;