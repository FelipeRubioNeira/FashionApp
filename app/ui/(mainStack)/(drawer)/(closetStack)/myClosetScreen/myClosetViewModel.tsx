import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScreenMainMenuParams } from "app/ui/navigation/interfaces";
import GetClothingUseCase from "app/domain/useCases/GetClothingUseCase";
import { CategorizedClothingCollection, Clothing, ClothingType } from "app/domain/Types";
import CreateOutfitUseCase from "app/domain/useCases/CreateOutfitUseCase";
import { useSelector, useDispatch } from 'react-redux';
import {
    closetState,
    onSearchClothing,
    resetSearchClothing,
    updateVisibleClothig,
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
    const {
        title,
        buttonList,
        visible,
        hideModal,
        showModal,
    } = useModalViewModel({
        title: translation.translate(TranslationKeys.saveOutfitTitle),
        visible: false,
        buttonList: [
            {
                label: translation.translate(TranslationKeys.saveButton),
                onPress: () => saveOutfit()
            },
            {
                label: translation.translate(TranslationKeys.cancelButton),
                onPress: () => cancelSaveOutfit()
            }
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

    /**
     * todas las validaciones de indices se hacen internamente
     */
    const onPressRandomOutfit = () => {

        const randomTop = getRandomItem(topClothing).id;
        const randomBottom = getRandomItem(bottomClothing).id;
        const randomShoes = getRandomItem(shoes).id;
        
        updateCurrentOutfit("top", randomTop)
        updateCurrentOutfit("bottom", randomBottom)
        updateCurrentOutfit("shoes", randomShoes)

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