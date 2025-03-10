import { useCallback, useState } from "react";
import GetOutfitsUseCase from '@/domain/useCases/GetOutfitsUseCase';
import DeleteOutfitUseCase from '@/domain/useCases/DeleteOutfitUseCase';
import { useFocusEffect, useRouter } from 'expo-router';
import { useSelector } from "react-redux";
import { OutfitState } from "@/store/OutfitsSlice";
import { Outfit } from "@/domain/Types";
import { ScreenEditOutfitParams } from "@/ui/navigation/interfaces";
import { setCurrentOutfit } from '@/store/OutfitsSlice'



const useMyOutfitsViewModel = (
    getOutfitsUseCase: GetOutfitsUseCase,
    deleteOutfitUseCase: DeleteOutfitUseCase
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


    return {
        outfits,
        onPressDeleteOutfit,
        onPressEditOutfit
    }


}

export default useMyOutfitsViewModel;
