import { useSelector } from 'react-redux';
import { closetState } from "@/store/ClosetSlice";
import { useCallback, useEffect, useState } from "react";
import { Outfit } from '@/domain/Types';
import GetOutfitsUseCase from '@/domain/useCases/GetOutfitsUseCase';
import DeleteOutfitUseCase from '@/domain/useCases/DeleteOutfitUseCase';
import { useFocusEffect } from 'expo-router';

interface ActionButton {
    onPress: () => void
}


const useMyOutfitsViewMode = (
    getOutfitsUseCase: GetOutfitsUseCase,
    deleteOutfitUseCase: DeleteOutfitUseCase
) => {



    // ----------- hooks ----------- //
    // const {
    //     bottomClothing,
    //     shoes,
    //     topClothing
    // } = useSelector(closetState)


    // ----------- states ----------- //
    const [outfits, setOutfits] = useState<Outfit[]>([])


    // ----------- effects ----------- //
    // useEffect(() => {
    //     getAllOutfits()
    // }, []) 
    // TODO: agregar dependencias para que se actualice cada vez que cambie el estado global

    useFocusEffect(
        useCallback(() => {
            getAllOutfits()
        }, [])
    )



    // ----------- methods ----------- //
    const getAllOutfits = async () => {
        const outfitList = await getOutfitsUseCase.execute()
        setOutfits(outfitList)
    }

    const onPressDeleteOutfit = async (outfitId: number) => {

        const { success, message } = await deleteOutfitUseCase.execute(outfitId)
        getAllOutfits()
        console.log("onPressDeleteOutfit", success, message);

    }

    const onPressEditOutfit = (outfit: Outfit) => {

    }


    return {
        outfits,
        onPressDeleteOutfit,
    }


}

export default useMyOutfitsViewMode;

export type {
    ActionButton
}