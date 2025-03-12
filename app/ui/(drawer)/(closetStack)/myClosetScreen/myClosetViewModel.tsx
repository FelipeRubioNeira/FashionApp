import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScreenMainMenuParams } from "@/ui/navigation/interfaces";
import GetClothingUseCase from "@/domain/useCases/GetClothingUseCase";
import { CategorizedClothingCollection, Clothing, ClothingType } from "@/domain/Types";
import CreateOutfitUseCase from "@/domain/useCases/CreateOutfitUseCase";

// ---------- store ---------- //
import { useSelector, useDispatch } from 'react-redux';
import {
    closetState,
    onSearchClothing,
    resetSearchClothing,
    updateVisibleClothig,
    lockClothingSearch
} from "@/store/ClosetSlice";
import useModalViewModel from "@/ui/components/modal/ModalViewModel";



const useMyClsetViewModel = (
    getClothingUseCase: GetClothingUseCase,
    creatOutfitUseCase: CreateOutfitUseCase
) => {


    // -------------- hooks -------------- //
    const {
        topClothing,
        bottomClothing,
        shoes,
        topVisibleClothingId,
        bottomVisibleClothingId,
        shoesVisibleClothingId,
        topClothingBlocked,
        bottomClothingBlocked,
        shoesBlocked,
    } = useSelector(closetState)
    const router = useRouter();
    const { imageUri } = useLocalSearchParams<ScreenMainMenuParams>();
    const dispatcher = useDispatch()


    // -------------- view model -------------- //
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

    // -------------- state -------------- //
    const [newOutfitName, setNewOutfitName] = useState("")
    const [searchValue, setSearchValue] = useState("")



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
        dispatcher(updateVisibleClothig({ clothingType, clothingId }))
    }

    const updateName = (name: string) => {
        setNewOutfitName(name)
    }


    const saveOutfit = async () => {

        const newOutfit = {
            id: 0, // or any appropriate id
            topClothing: { id: topVisibleClothingId } as Clothing,
            bottomClothing: { id: bottomVisibleClothingId } as Clothing,
            shoes: { id: shoesVisibleClothingId } as Clothing,
            name: newOutfitName,
        }

        const result = await creatOutfitUseCase.execute(newOutfit)

        hideModal()
        updateName("")
    }

    const onPressRandomOutfit = () => {

        // si no hay prendas de ropa entonces no se hace nada
        if (!topClothing.length || !bottomClothing.length || !shoes.length) {
            return;
        }

        const randomTop = getRandomItem(topClothing).id;
        const randomBottom = getRandomItem(bottomClothing).id;
        const randomShoes = getRandomItem(shoes).id;

        updateCurrentOutfit("Superior", randomTop)
        updateCurrentOutfit("Inferior", randomBottom)
        updateCurrentOutfit("Zapatos", randomShoes)


    }

    const getRandomItem = (clothingList: Clothing[]) => {
        const randomIndex = Math.floor(Math.random() * clothingList.length);
        return clothingList[randomIndex];
    }

    const cancelSaveOutfit = () => {
        hideModal()
        updateName("")
    }


    // -------------- search methods-------------- //
    const onSearchTextChange = (value: string) => {

        setSearchValue(value)

        if (value.length >= 3) dispatcher(onSearchClothing(value))
        else cleanSearchStore()
    }

    const onDeleteSearch = () => {
        cleanSearchStore()
        setSearchValue("")
    }

    const cleanSearchStore = () => {
        dispatcher(resetSearchClothing())
    }

    // -------------- lock / unlock clothing tipe search  -------------- //
    const lockSearch = (clothingType: ClothingType) => {
        dispatcher(lockClothingSearch({ clothingType }))
    }




    // -------------- return -------------- //
    return {
        topVisibleClothingId,
        bottomVisibleClothingId,
        shoesVisibleClothingId,
        topClothingBlocked,
        bottomClothingBlocked,
        shoesBlocked,
        searchValue,
        topClothing, bottomClothing, shoes,
        navigateToAddClothing,
        updateCurrentOutfit,
        modalTitle: title,
        modalVisible: visible,
        ModalButtonList: buttonList,
        updateName,
        outfitName: newOutfitName,
        showModal,
        hideModal,
        onPressRandomOutfit,
        onSearchTextChange,
        onDeleteSearch,
        lockSearch,
    }

}



export default useMyClsetViewModel;