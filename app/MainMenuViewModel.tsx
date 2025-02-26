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

        const {
            topClothing,
            bottomClothing,
            shoes
        } = await getClothingUseCase.execute()

        setTopClothingList([...topClothing]);
        setBottomClothingList([...bottomClothing]);
        setShoesList([...shoes]);

    }

    const onPressClothing = (clothing: Clothing) => {
        router.navigate({
            pathname: "/ui/screens/addClothingScreen",
            params: { ...clothing }
        })
    }

    /**
     * 
     * @param clothing - La prenda que se desea eliminar
     */
    const onPressDeleteClothing = async (clothing: Clothing) => {

        const {
            success,
            message
        } = await deleteClothingUseCase.execute(clothing)

        if (success) getAllClothing()

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