import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Clothing, ClothingType, EditOutfitInformation } from 'FashonApp/src/domain/Types';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScreenEditOutfitParams } from 'app/ui/navigation/interfaces';
import EditOutfitUseCase from 'FashonApp/src/domain/useCases/EditOutfitUseCase';
import {
    closetState,
    onSearchClothing,
    resetSearchClothing,
    lockClothingSearch,
    updateVisibleClothig
} from "app/store/ClosetSlice";
import useModalViewModel from "app/ui/components/modal/ModalViewModel";



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
        title: "Guardar combinacion",
        visible: false,
        buttonList: [
            { label: "Guardar", onPress: () => saveOutfit() },
            { label: "Cancelar", onPress: () => cancelSaveOutfit() }
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
        updateCurrentOutfit("Superior", topId)
        updateCurrentOutfit("Inferior", bottomId)
        updateCurrentOutfit("Zapatos", shoesId)
        setNewOutfitName(outfitName)
    }


    const onPressUpdateOutfit = async (currentOutfit: EditOutfitInformation) => {
        console.log("Se ha presionado onPressUpdateOutfit", currentOutfit);
        const { success, message } = await editOutfitUseCase.execute(currentOutfit)
    }


    const onPressCancel = () => {
        console.log("se ha presionado el boton de cancelar");
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
        console.log("se ha presionado el dado");


        // si no hay prendas de ropa entonces no se hace nada
        if (!topClothing.length || !bottomClothing.length || !shoes.length) {
            return;
        }

        if (!topClothingBlocked) {
            const randomTop = getRandomItem(topClothing).id;
            updateCurrentOutfit("Superior", randomTop)
        }

        if (!bottomClothingBlocked) {
            const randomBottom = getRandomItem(bottomClothing).id;
            updateCurrentOutfit("Inferior", randomBottom)
        }
        if (!shoesBlocked) {
            const randomShoes = getRandomItem(shoes).id;
            updateCurrentOutfit("Zapatos", randomShoes)
        }

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


        console.log("Se ha presionado onPressUpdateOutfit", outfit);
        const { success, message } = await editOutfitUseCase.execute(outfit)

        hideModal()
        updateOutfitName("")
        router.back()
    }

    const cancelSaveOutfit = () => {
        hideModal()
        // TODO:
        //updateOutfitName("")
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