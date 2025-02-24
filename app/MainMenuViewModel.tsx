import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScreenMainMenuParams } from "./ui/navigation/interfaces";
import GetClothingUseCase from "./domain/useCases/GetClothingUseCase";
import { CategorizedClothingCollection, Clothing, ClothingType } from "./domain/Types";




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

        if(topClothing.length > 0 ) {
            setTopClothingList(topClothing)
        }



    }


    // -------------- return -------------- //
    return {
        navigateToAddClothing,
        topClothingList
    }

}



export default useMainMenuViewModel;