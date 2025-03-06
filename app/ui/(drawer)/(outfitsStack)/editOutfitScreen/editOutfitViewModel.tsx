import { useSelector } from 'react-redux';
import { closetState } from "@/store/ClosetSlice";
import { useEffect, useState } from 'react';
import { ClothingType, EditOutfitInformation } from '@/domain/Types';
import { useLocalSearchParams } from 'expo-router';
import { ScreenEditOutfitParams } from '@/ui/navigation/interfaces';


const useEditOutfitViewModel = (

) => {


    const params = useLocalSearchParams<ScreenEditOutfitParams>()

    const {
        outfitId,
        outfitName,
        topClothingId,
        bottomClothingId,
        shoesId
    } = params


    // ----------- hooks ----------- //
    const { topClothing, bottomClothing, shoes } = useSelector(closetState)

    // ----------- state ----------- //
    const [currentOutfit, setCurrentOutfit] = useState<EditOutfitInformation>({
        outfitId: 0,
        name: "",
        topId: 0,
        bottomId: 0,
        shoesId: 0
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
        setCurrentOutfit({ ...outfitInformation })
    }


    const onPressUpdateOutfit = (currentOutfit: EditOutfitInformation) => {

        console.log("Se ha presionado onPressUpdateOutfit", currentOutfit);

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

    return {
        currentOutfit,
        topClothing,
        bottomClothing,
        shoes,
        updateCurrentOutfit,
        onPressUpdateOutfit,
    }
}

export default useEditOutfitViewModel