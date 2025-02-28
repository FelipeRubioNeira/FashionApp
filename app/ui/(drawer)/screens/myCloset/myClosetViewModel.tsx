import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScreenMainMenuParams } from "@/ui/navigation/interfaces";
import GetClothingUseCase from "@/domain/useCases/GetClothingUseCase";
import { Clothing, ClothingType } from "@/domain/Types";
import DeleteClothingUseCase from "@/domain/useCases/DeleteClothingUseCase";
import CreateOutfitUseCase from "@/domain/useCases/CreateOutfitUseCase";

// ---------- store ---------- //
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "@/store/Store";
import { initialiceItems } from "@/store/ClosetSlice";




const useMyClsetViewModel = (
    getClothingUseCase: GetClothingUseCase,
    deleteClothingUseCase: DeleteClothingUseCase,
    creatOutfitUseCase: CreateOutfitUseCase
) => {


    // -------------- hooks -------------- //
    const { topClothing, bottomClothing, shoes } = useSelector((state: RootState) => state.closet)
    const dispatch = useDispatch()


    const router = useRouter();
    const { clothingType, imageUri } = useLocalSearchParams<ScreenMainMenuParams>();


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
    const navigateToAddClothing = (clothing?: Clothing) => {

        const path = "/ui/screens/addClothingScreen"

        // si nos llegan valores entonces navegamos con ellos
        if (clothing) {
            router.navigate({ pathname: path, params: { ...clothing } })
            return
        }

        // de otra manera navegamos sin valores
        router.navigate(path)
    }

    const getAllClothing = async (filter?: ClothingType) => {

        const {
            topClothing,
            bottomClothing,
            shoes
        } = await getClothingUseCase.execute()

        dispatch(initialiceItems({
            bottomClothing,
            topClothing,
            shoes
        }))

        // // se llenan los datos
        // setTopClothingList([...topClothing]);
        // setBottomClothingList([...bottomClothing]);
        // setShoesList([...shoes]);

        // se establece el outfit por defecto
        updateCurrentOutfit("Superior", topClothing[0].id || 0)
        updateCurrentOutfit("Inferior", bottomClothing[0].id || 0)
        updateCurrentOutfit("Zapatos", shoes[0].id || 0)

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
        topClothing, bottomClothing, shoes,
        navigateToAddClothing,
        onPressDeleteClothing,
        updateCurrentOutfit,
        onPressSaveOutfit
    }

}



export default useMyClsetViewModel;