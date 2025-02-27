import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScreenMainMenuParams } from "./ui/navigation/interfaces";
import GetClothingUseCase from "./domain/useCases/GetClothingUseCase";
import { Clothing, ClothingType } from "./domain/Types";
import DeleteClothingUseCase from "./domain/useCases/DeleteClothingUseCase";
import CreateOutfitUseCase from "./domain/useCases/CreateOutfitUseCase";




const useMainMenuViewModel = (
    getClothingUseCase: GetClothingUseCase,
    deleteClothingUseCase: DeleteClothingUseCase,
    creatOutfitUseCase: CreateOutfitUseCase
) => {


    // -------------- hooks -------------- //
    const router = useRouter();
    const { clothingType, imageUri } = useLocalSearchParams<ScreenMainMenuParams>();


    // -------------- state -------------- //
    const [topClothingList, setTopClothingList] = useState<Clothing[]>([])
    const [bottomClothingList, setBottomClothingList] = useState<Clothing[]>([])
    const [shoesList, setShoesList] = useState<Clothing[]>([])

    const [currentOutfit, setCurrentOutfit] = useState({
        topId: 0,
        bottomId: 0,
        shoesId: 0,
        name: "",
    })





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

        // se llenan los datos
        setTopClothingList([...topClothing]);
        setBottomClothingList([...bottomClothing]);
        setShoesList([...shoes]);


        // se establece el outfit por defecto
        updateCurrentOutfit("Superior", topClothing[0].id || 0)
        updateCurrentOutfit("Inferior", bottomClothing[0].id || 0)
        updateCurrentOutfit("Zapatos", shoes[0].id || 0)

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

    /**
     * 
     * @param clothingType - Tipo de prenda que se debe actualizar
     * @param clothingId - Id de la ropa seleccionada
     */
    const updateCurrentOutfit = (clothingType: ClothingType, clothingId: number) => {

        switch (clothingType) {
            case "Superior":
                setCurrentOutfit({ ...currentOutfit, topId: clothingId })
                break;

            case "Inferior":
                setCurrentOutfit({ ...currentOutfit, bottomId: clothingId })
                break;

            case "Zapatos":
                setCurrentOutfit({ ...currentOutfit, shoesId: clothingId })
                break;
        }

    }

    const onPressSaveOutfit = async () => {

        const result = await creatOutfitUseCase.execute({
            topClothing: { id: currentOutfit.topId } as Clothing,
            bottomClothing: { id: currentOutfit.bottomId } as Clothing,
            shoes: { id: currentOutfit.shoesId } as Clothing,
            name: "default name"
        })

        console.log("result creatOutfitUseCase", result);



    }


    // -------------- return -------------- //
    return {
        topClothingList,
        bottomClothingList,
        shoesList,

        navigateToAddClothing,
        onPressClothing,
        onPressDeleteClothing,
        updateCurrentOutfit,
        onPressSaveOutfit
    }

}



export default useMainMenuViewModel;