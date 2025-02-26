import { useEffect, useState } from 'react'
import useGalleryViewCmp from '../../components/GalleryViewCmp'
import { useLocalSearchParams, useRouter } from 'expo-router'
import * as FileSystem from 'expo-file-system';
import { Tables } from '../../../data/db/TableNames'
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import AddClothingUseCase from '@/app/domain/useCases/AddClothingUseCase';
import { Clothing, ClothingStyle, ClothingType, ResponseUseCase } from '@/app/domain/Types';
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



    // --------------- effects --------------- //
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

    /**
     * Guardar prenda (crear / editar)
     * @param newClothing - prenda a que no necesariamente esta completa en todos sus campos
     */
    const saveImage = async (newClothing: Partial<Clothing>) => {

        console.log("saveImage ", newClothing, id);

        try {

            let resposeUseCase: ResponseUseCase<Clothing> = {
                message: "",
                success: false,
                data: undefined
            }


            // 1. Guarda/actualiza la prenda en la base de datos
            if (id) {
                const { success, data, message } = await editClothingUseCase.execute(newClothing)
                resposeUseCase.success = success
                resposeUseCase.data = data
                resposeUseCase.message = message

                console.log("edit ", resposeUseCase);


            } else {
                const { success, data, message } = await addClothingUseCase.execute(newClothing)
                resposeUseCase.success = success
                resposeUseCase.data = data
                resposeUseCase.message = message

                console.log("create ", success, data);


            }

            console.log("resposeUseCase ", resposeUseCase);


            // Solo en caso de que la operacion sea exitosa y se retornen valores 
            if (!resposeUseCase.success || !resposeUseCase.data) return;

            const { uri: imageUri, type: clothingType } = resposeUseCase.data

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