import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ScreenMainMenuParams } from "app/ui/navigation/interfaces";
import GetClothingUseCase from "app/domain/useCases/GetClothingUseCase";
import { CategorizedClothingCollection, Clothing, ClothingType } from "@/domain/types/Types";
import CreateOutfitUseCase from "app/domain/useCases/CreateOutfitUseCase";
import { useSelector, useDispatch } from 'react-redux';
import { useCameraPermissions } from 'expo-camera';


import {
    closetState,
    onSearchClothing,
    resetSearchClothing,
    updateVisibleClothing,
    lockClothingSearch
} from "app/store/ClosetSlice";
import useModalViewModel from "app/ui/components/modal/ModalViewModel";
import { container } from "tsyringe";
import { Translation, TranslationKeys } from "@/ui/i18n";



// -------------- DI -------------- //
const translation = container.resolve(Translation);




// -------------- view model -------------- //
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
    const modal = useModalViewModel()
    const [permission, requestPermission] = useCameraPermissions();

    // -------------- state -------------- //
    const [newOutfitName, setNewOutfitName] = useState("")
    const newOutfitNameRef = useRef("")
    const [searchValue, setSearchValue] = useState("")



    // -------------- effects -------------- //

    useEffect(() => {
        if (permission?.granted) {
            return;
        }
        requestPermission();
    }, [])

    useEffect(() => {
        getAllClothing()
    }, [imageUri])





    // -------------- funtions -------------- //
    const navigateToAddClothing = (clothing?: Clothing) => {

        const path = "../addClothingScreen"

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
        updateCurrentOutfit("top", topClothing[0].id || 0)
        updateCurrentOutfit("bottom", bottomClothing[0].id || 0)
        updateCurrentOutfit("shoes", shoes[0].id || 0)
    }

    /**
     * 
     * @param clothingType - Tipo de prenda que se debe actualizar
     * @param clothingId - Id de la ropa seleccionada
     */
    const updateCurrentOutfit = (clothingType: ClothingType, clothingId: number) => {
        dispatcher(updateVisibleClothing({ clothingType, clothingId }))
    }

    const updateName = (name: string) => {
        setNewOutfitName(name)
        newOutfitNameRef.current = name
    }


    const saveOutfit = async () => {

        const newOutfit = {
            id: 0, // or any appropriate id
            topClothing: { id: topVisibleClothingId } as Clothing,
            bottomClothing: { id: bottomVisibleClothingId } as Clothing,
            shoes: { id: shoesVisibleClothingId } as Clothing,
            name: newOutfitNameRef.current,
        }

        const result = await creatOutfitUseCase.execute(newOutfit)

        modal.closeModal()
        updateName("")
    }



    /**
     * todas las validaciones de indices se hacen internamente
     */
    const onPressRandomOutfit = () => {

        const randomTop = getRandomItem(topClothing)?.id || 0;
        const randomBottom = getRandomItem(bottomClothing)?.id || 0;
        const randomShoes = getRandomItem(shoes)?.id || 0;

        updateCurrentOutfit("top", randomTop)
        updateCurrentOutfit("bottom", randomBottom)
        updateCurrentOutfit("shoes", randomShoes)

    }

    const getRandomItem = (clothingList: Clothing[]) => {
        const randomIndex = Math.floor(Math.random() * clothingList.length);
        return clothingList[randomIndex];
    }

    const cancelSaveOutfit = () => {
        modal.closeModal()
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

    const onPressSaveOutfit = () => {

        // si no hay prendas visibles suficientes entonces no se puede guardar el outfit
        if (
            topVisibleClothingId == -1
            || bottomVisibleClothingId == -1
            || shoesVisibleClothingId == -1
        ) {
            showModalHasMinimumClothing()
        } else {
            showModalSaveOutfit()
        }

    }

    const showModalHasMinimumClothing = () => {

        modal.openModal({
            title: translation.translate(TranslationKeys.saveOutfitTitle),
            message: translation.translate(TranslationKeys.saveOutfitMessageMinimum),
            modalType: "message",
            buttonList: [{
                label: translation.translate(TranslationKeys.saveButton),
                onPress: () => modal.closeModal()
            }],
        })

    }

    const showModalSaveOutfit = () => {

        modal.openModal({
            title: translation.translate(TranslationKeys.saveOutfitTitle),
            modalType: "form",
            buttonList: [
                {
                    label: translation.translate(TranslationKeys.saveButton),
                    onPress: () => saveOutfit()
                },
                {
                    label: translation.translate(TranslationKeys.cancelButton),
                    onPress: () => cancelSaveOutfit()
                }
            ],

        })

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
        updateName,
        outfitName: newOutfitName,
        onPressSaveOutfit,
        onPressRandomOutfit,
        onSearchTextChange,
        onDeleteSearch,
        lockSearch,
        modalProps: modal.config,
    }

}



export default useMyClsetViewModel;