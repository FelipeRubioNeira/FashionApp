import { useEffect, useState } from 'react'
import useGalleryViewCmp from '../../components/GalleryViewCmp'
import { useLocalSearchParams, useRouter } from 'expo-router'
import * as FileSystem from 'expo-file-system';
import { Tables } from '../../../data/db/TableNames'
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import AddClothingUseCase from '@/app/domain/useCases/AddClothingUseCase';
import { Clothing, ClothingStyle, ClothingType } from '@/app/domain/Types';
import { DBConstants } from '@/app/data/db/DBConstants';
import { ScreenAddClothingParams } from '../../navigation/interfaces';
import EditClothingUseCase from '@/app/domain/useCases/EditClothingUseCase';
import { ClothingStylesList, ClothingTypeList } from '@/app/domain/Types';




const useAddClouthingViewModel = (
    addClothingUseCase: AddClothingUseCase,
    editClothingUseCase: EditClothingUseCase
) => {


    // --------------- hook --------------- //
    const router = useRouter();
    const params = useLocalSearchParams<ScreenAddClothingParams>();
    const { id, name, style, type, uri } = params


    // --------------- state --------------- //
    const [newClothing, setNewClothing] = useState<Partial<Clothing>>({
        uri: "",
        name: "",
        style: "",
        type: "",
    })

    const [viewMode, setViewMode] = useState<'camera' | 'preview'>('preview')
    const { showGallery } = useGalleryViewCmp()
    const [categoryList] = useState<ClothingType[]>([...ClothingTypeList])
    const navigation = useNavigation();



    // --------------- state --------------- //
    useEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [])

    useEffect(() => {
        if (id) fillClothingInformation({ id, name, style, type, uri })
    }, [id])



    // --------------- methods --------------- //
    const openGallery = async () => {

        const uri = await showGallery()

        if (uri) {
            setNewClothing({ ...newClothing, uri: uri })
            setViewMode('preview')
        }
    }

    const openCamera = async () => {
        setViewMode('camera')
    }

    const takePicture = (uri: string | null) => {
        if (uri) {
            setNewClothing({ ...newClothing, uri: uri })
            setViewMode('preview')
        }
    }

    const saveImage = async (newClothing: Partial<Clothing>) => {


        try {

            // 1. Guardar la prenda en la base de datos
            const { success, data } = await addClothingUseCase.execute(newClothing)

            if (!success || !data) return;

            const { uri: imageUri, type: clothingType } = data

            router.back();
            router.setParams({
                imageUri,
                clothingType
            })


        } catch (error) {
            console.log("Error al guardar la imagen ", error);
        }


    }


    // ----------- metodos para actualizar estado ----------- //

    const updateClothingName = (newValue: string) => {
        setNewClothing({ ...newClothing, name: newValue })
    }

    const onChangeCategory = (categoryItem: ClothingType) => {
        setNewClothing({ ...newClothing, type: categoryItem })
    }

    const updateClothingStyle = (style: ClothingStyle) => {
        setNewClothing({ ...newClothing, style })

    }



    const fillClothingInformation = async (clothing: Clothing): Promise<void> => {
        if (!clothing) return
        setNewClothing({ ...clothing })
    }


    // --------------- return  --------------- //
    return {


        // ... atributes
        newClothing,
        viewMode,
        categoryList,
        ClothingStylesList,

        // ... methods
        openGallery,
        openCamera,
        takePicture,
        saveImage,
        updateClothingName,
        onChangeCategory,

        updateClothingStyle
    }



}

export default useAddClouthingViewModel