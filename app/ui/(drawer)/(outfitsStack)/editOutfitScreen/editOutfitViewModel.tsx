import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ClothingType, EditOutfitInformation } from '@/domain/Types';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScreenEditOutfitParams } from '@/ui/navigation/interfaces';
import EditOutfitUseCase from '@/domain/useCases/EditOutfitUseCase';
import { closetState } from "@/store/ClosetSlice";



const useEditOutfitViewModel = (
    editOutfitUseCase: EditOutfitUseCase
) => {

    // ----------- global state ----------- //
    const { topClothing, bottomClothing, shoes } = useSelector(closetState)

    // ----------- hooks ----------- //
    const params = useLocalSearchParams<ScreenEditOutfitParams>()
    const {
        outfitId,
        outfitName,
        topClothingId,
        bottomClothingId,
        shoesId
    } = params

    const router = useRouter()




    // ----------- state ----------- //
    const [currentOutfit, setCurrentOutfit] = useState<EditOutfitInformation>({
        outfitId: 0,
        name: "",
        topId: 0,
        bottomId: 0,
        shoesId: 0
    })

    const [initialOutfit] = useState({
        topId: topClothingId,
        bottomId: bottomClothingId,
        shoesId: shoesId
    })




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


    const loadOutfit = (outfitInformation: EditOutfitInformation) => {
        console.log("se ha cargado este outfit", outfitInformation);
        setCurrentOutfit({ ...outfitInformation })
    }


    const onPressUpdateOutfit = async (currentOutfit: EditOutfitInformation) => {

        console.log("Se ha presionado onPressUpdateOutfit", currentOutfit);
        const { success, message } = await editOutfitUseCase.execute(currentOutfit)

        if (success) router.back()

    }


    /**
     * Se actualiza el id de la prenda automaticamente cada vez que se hace scroll
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

    const updateOutfitName = (name: string) => {
        setCurrentOutfit({ ...currentOutfit, name })
    }

    return {
        initialOutfit,
        currentOutfit,
        topClothing,
        bottomClothing,
        shoes,
        updateCurrentOutfit,
        onPressUpdateOutfit,
        updateOutfitName
    }
}

export default useEditOutfitViewModel