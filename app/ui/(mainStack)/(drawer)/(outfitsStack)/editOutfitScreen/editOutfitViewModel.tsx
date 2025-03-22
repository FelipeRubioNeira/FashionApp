import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Clothing, ClothingType, EditOutfitInformation } from '@/domain/types/Types';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScreenEditOutfitParams } from 'app/ui/navigation/interfaces';
import { EditOutfitUseCase } from '@/domain/useCases';
import {
    closetState,
    onSearchClothing,
    resetSearchClothing,
    lockClothingSearch,
    updateVisibleClothig
} from "app/store/ClosetSlice";
import useModalViewModel from "app/ui/components/modal/ModalViewModel";
import { container } from 'tsyringe'
import { Translation, TranslationKeys } from '@/ui/i18n'


const translation = container.resolve(Translation);



const useEditOutfitViewModel = (
    editOutfitUseCase: EditOutfitUseCase
) => {

    // ----------- global state ----------- //
    const {
        topClothing,
        bottomClothing,
        shoes,
        topClothingBlocked,
        bottomClothingBlocked,
        shoesBlocked,
        topVisibleClothingId,
        bottomVisibleClothingId,
        shoesVisibleClothingId,
    } = useSelector(closetState)

    // ----------- hooks ----------- //
    const params = useLocalSearchParams<ScreenEditOutfitParams>()
    const {
        outfitId,
        outfitName,
        topClothingId,
        bottomClothingId,
        shoesId
    } = params

    const dispatcher = useDispatch()
    const router = useRouter()


    // ----------- view model ----------- //
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



    // ----------- state ----------- //
    const [searchValue, setSearchValue] = useState<string>("")
    const [newOutfitName, setNewOutfitName] = useState("")



    // ----------- effets ----------- //
    useEffect(() => {

        loadOutfit({
            outfitId: outfitId,
            name: outfitName,
            topId: topClothingId,
            bottomId: bottomClothingId,
            shoesId: shoesId
        })

    }, [outfitId])


    const loadOutfit = ({ topId, bottomId, shoesId }: EditOutfitInformation) => {
        updateCurrentOutfit("top", topId)
        updateCurrentOutfit("bottom", bottomId)
        updateCurrentOutfit("shoes", shoesId)
        setNewOutfitName(outfitName)
    }


    const onPressUpdateOutfit = async (currentOutfit: EditOutfitInformation) => {
        const { success, message } = await editOutfitUseCase.execute(currentOutfit)
    }


    const onPressCancel = () => {
        router.back()
    }


    /**
     * Se actualiza el id de la prenda automaticamente cada vez que se hace scroll
     * 
     * @param clothingType - Tipo de prenda que se debe actualizar
     * @param clothingId - Id de la ropa seleccionada
     */
    const updateCurrentOutfit = (clothingType: ClothingType, clothingId: number) => {
        dispatcher(updateVisibleClothig({ clothingType, clothingId }))
    }

    const updateOutfitName = (name: string) => {
        setNewOutfitName(name)
    }

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

    const lockSearch = (clothingType: ClothingType) => {
        dispatcher(lockClothingSearch({ clothingType }))
    }

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

    const saveOutfit = async () => {

        const outfit: EditOutfitInformation = {
            topId: topVisibleClothingId,
            bottomId: bottomVisibleClothingId,
            shoesId: shoesVisibleClothingId,
            name: newOutfitName,
            outfitId,
        }

        const { success, message } = await editOutfitUseCase.execute(outfit)

        hideModal()
        updateOutfitName("")
        router.back()
    }

    const cancelSaveOutfit = () => {
        hideModal()
    }


    // --------- returns ----------- //
    return {
        searchValue,
        topVisibleClothingId,
        bottomVisibleClothingId,
        shoesVisibleClothingId,
        topClothing,
        bottomClothing,
        shoes,
        updateCurrentOutfit,
        onPressUpdateOutfit,
        updateOutfitName,
        onSearchTextChange,
        onDeleteSearch,
        topClothingBlocked,
        bottomClothingBlocked,
        shoesBlocked,
        lockSearch,
        onPressRandomOutfit,
        onPressCancel,
        showModal,
        modalVisible: visible,
        modalTitle: title,
        ModalButtonList: buttonList,
        outfitName: newOutfitName,
        hideModal,
        updateName: updateOutfitName,
    }
}

export default useEditOutfitViewModel