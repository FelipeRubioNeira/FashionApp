import { useRouter, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ScreenMainMenuParams } from "@/ui/navigation/interfaces";
import GetClothingUseCase from "@/domain/useCases/GetClothingUseCase";
import { CategorizedClothingCollection, Clothing, ClothingType } from "@/domain/Types";
import DeleteClothingUseCase from "@/domain/useCases/DeleteClothingUseCase";
import CreateOutfitUseCase from "@/domain/useCases/CreateOutfitUseCase";

// ---------- store ---------- //
import { useSelector } from 'react-redux';
import { closetState } from "@/store/ClosetSlice";
import { ModalCmpProps } from "@/ui/UITypes";
import useModalViewModel from "@/ui/components/modal/ModalViewModel";



const useMyClsetViewModel = (
    getClothingUseCase: GetClothingUseCase,
    creatOutfitUseCase: CreateOutfitUseCase
) => {


    // -------------- hooks -------------- //
    const { topClothing, bottomClothing, shoes } = useSelector(closetState)
    const router = useRouter();
    const { imageUri } = useLocalSearchParams<ScreenMainMenuParams>();



    const {
        title,
        buttonList,
        visible,
        hideModal,
        showModal,
    } = useModalViewModel({
        title: "Guardar combinacion",
        visible: false,
        buttonList: [
            { label: "Guardar", onPress: () => saveOutfit() },
            { label: "Cancelar", onPress: () => cancelSaveOutfit() }
        ]
    })


    const [currentOutfit, setCurrentOutfit] = useState({
        topId: 0,
        bottomId: 0,
        shoesId: 0,
        name: "",
    })



    // -------------- effects -------------- //
    useEffect(() => {
        getAllClothing()
    }, [imageUri])



    // -------------- funtions -------------- //
    const navigateToAddClothing = (clothing?: Clothing) => {

        const path = "/ui/(drawer)/(closetStack)/addClothingScreen"

        // si nos llegan valores entonces navegamos con ellos
        if (clothing) {
            router.navigate({ pathname: path, params: { ...clothing } })
            return
        }

        // de otra manera navegamos sin valores
        router.navigate(path)
    }

    const getAllClothing = async () => {
        const categotizedData = await getClothingUseCase.execute()
        setupDefaultOutfit(categotizedData)
    }

    /**
     * 
     * @param topClothing, bottomClothing, shoes = Valores categorizados para esteblecer el primer outfit por defecto
     */
    const setupDefaultOutfit = ({ topClothing, bottomClothing, shoes }: CategorizedClothingCollection) => {
        updateCurrentOutfit("Superior", topClothing[0].id || 0)
        updateCurrentOutfit("Inferior", bottomClothing[0].id || 0)
        updateCurrentOutfit("Zapatos", shoes[0].id || 0)
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

    const updateName = (name: string) => {
        setCurrentOutfit({ ...currentOutfit, name })
    }


    const saveOutfit = async () => {

        const result = await creatOutfitUseCase.execute({
            id: 0, // or any appropriate id
            topClothing: { id: currentOutfit.topId } as Clothing,
            bottomClothing: { id: currentOutfit.bottomId } as Clothing,
            shoes: { id: currentOutfit.shoesId } as Clothing,
            name: currentOutfit.name,
        })

        hideModal()
        resetCurrentOutfit()
    }

    const resetCurrentOutfit = () => {
        setCurrentOutfit({
            ...currentOutfit,
            name: "",
        })
    }

    const onPressRandomOutfit = () => {

        // si no hay prendas de ropa entonces no se hace nada
        if (!topClothing.length || !bottomClothing.length || !shoes.length) {
            return;
        }

        const randomTop = getRandomItem(topClothing).id;
        const randomBottom = getRandomItem(bottomClothing).id;
        const randomShoes = getRandomItem(shoes).id;

        setCurrentOutfit({
            ...currentOutfit,
            topId: randomTop,
            bottomId: randomBottom,
            shoesId: randomShoes,
        })

    }

    const getRandomItem = (clothingList: Clothing[]) => {
        const randomIndex = Math.floor(Math.random() * clothingList.length);
        return clothingList[randomIndex];
    }

    const cancelSaveOutfit = () => {
        hideModal()
        resetCurrentOutfit()
    }






    // -------------- return -------------- //
    return {
        topClothing, bottomClothing, shoes,
        navigateToAddClothing,
        updateCurrentOutfit,
        modalTitle: title,
        modalVisible: visible,
        ModalButtonList: buttonList,
        updateName,
        outfitName: currentOutfit.name,
        showModal,
        hideModal,
        onPressRandomOutfit,
        currentOutfit
    }

}



export default useMyClsetViewModel;