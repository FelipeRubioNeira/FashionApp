import { useCallback } from "react";
import { useFocusEffect, useRouter } from 'expo-router';
import { useSelector } from "react-redux";
import { OutfitState } from "app/store/OutfitsSlice";
import { Outfit } from "@/domain/types/Types";
import { ScreenEditOutfitParams } from "app/ui/navigation/interfaces";


import {GetOutfitsUseCase, DeleteOutfitUseCase, DuplicateOutfitUseCase} from "@/domain/useCases"



const useMyOutfitsViewModel = (
    getOutfitsUseCase: GetOutfitsUseCase,
    deleteOutfitUseCase: DeleteOutfitUseCase,
    duplicateOutfitUseCase: DuplicateOutfitUseCase
) => {

    
    // ----------- hooks ----------- //
    const { outfits } = useSelector(OutfitState)
    const router = useRouter()



    // ----------- effects ----------- //

    useFocusEffect(
        useCallback(() => {
            getAllOutfits()
        }, [])
    )



    // ----------- methods ----------- //
    const getAllOutfits = async () => {
        // esperamos pero no hacemos nada de momento
        await getOutfitsUseCase.execute()
    }

    const onPressDeleteOutfit = async (outfitId: number) => {
        const { success, message } = await deleteOutfitUseCase.execute(outfitId)
        getAllOutfits()
    }

    const onPressEditOutfit = (outfit: Outfit) => {
        
        const { topClothing, bottomClothing, shoes } = outfit

        const params: ScreenEditOutfitParams = {
            outfitId: outfit.id,
            outfitName: outfit.name,
            topClothingId: topClothing.id,
            bottomClothingId: bottomClothing.id,
            shoesId: shoes.id
        }

        router.navigate({ pathname: "/ui/editOutfitScreen", params })
    }

    const onPressDuplicateOutfit = async (outfitId: number) => {

        const useCaseResponse = await duplicateOutfitUseCase.execute(outfitId)
        console.log("Duplicated outfit response: ", useCaseResponse);
        
    }


    return {
        outfits,
        onPressDeleteOutfit,
        onPressEditOutfit,
        onPressDuplicateOutfit
    }


}

export default useMyOutfitsViewModel;
