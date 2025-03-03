import { useCallback, useState } from "react";
import { Outfit } from '@/domain/Types';
import GetOutfitsUseCase from '@/domain/useCases/GetOutfitsUseCase';
import DeleteOutfitUseCase from '@/domain/useCases/DeleteOutfitUseCase';
import { useFocusEffect, useRouter } from 'expo-router';

interface ActionButton {
    onPress: () => void
}


const useMyOutfitsViewMode = (
    getOutfitsUseCase: GetOutfitsUseCase,
    deleteOutfitUseCase: DeleteOutfitUseCase
) => {



    // ----------- hooks ----------- //

    const router = useRouter()

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
    }

    const onPressEditOutfit = () => {
        router.navigate("/ui/editOutfitScreen")
    }


    return {
        outfits,
        onPressDeleteOutfit,
        onPressEditOutfit
    }


}

export default useMyOutfitsViewMode;

export type {
    ActionButton
}