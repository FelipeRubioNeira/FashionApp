import { useSelector } from 'react-redux';
import { closetState } from "@/store/ClosetSlice";
import { useState } from 'react';
import { ClothingType } from '@/domain/Types';


type OutfitInformation = {
    name: string,
    topId: number,
    bottomId: number,
    shoesId: number
}


const useEditOutfitViewModel = () => {


    // ----------- hooks ----------- //
    const { topClothing, bottomClothing, shoes } = useSelector(closetState)

    // ----------- state ----------- //
    const [currentOutfit, setCurrentOutfit] = useState<OutfitInformation>({
        name: "",
        topId: 0,
        bottomId: 0,
        shoesId: 0
    })


    const updateOutfit = () => {

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

    return {
        topClothing,
        bottomClothing,
        shoes,
        updateCurrentOutfit
    }
}

export default useEditOutfitViewModel