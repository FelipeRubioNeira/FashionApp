import { useState } from 'react'
import useGalleryViewCmp from '../../components/GalleryViewCmp'
import { useRouter } from 'expo-router'
import * as FileSystem from 'expo-file-system';
import { Tables } from '../../../db/TableNames'
import { useSQLiteContext } from 'expo-sqlite'
import { TopClothingType } from '../../../db/TableTypes'



const useAddClouthingViewModel = () => {


    // --------------- context --------------- //
    const db = useSQLiteContext();


    // --------------- state --------------- //
    const router = useRouter();
    const [image, setImage] = useState<string | null>(null)
    const [viewMode, setViewMode] = useState<'camera' | 'preview'>('preview')
    const { showGallery } = useGalleryViewCmp()
    const [clothingName, setClothingName] = useState<string>("")
    const [categoryList] = useState<string[]>(["Superior", "Inferior", "Calzado"])
    const [selectedCategoryItem, setSelectedCategoryItem] = useState<string>("")




    // --------------- methods --------------- //
    const openGallery = async () => {

        const uri = await showGallery()

        if (uri) {
            setImage(uri)
            setViewMode('preview')
        }
    }

    const openCamera = async () => {
        setViewMode('camera')
    }

    const takePicture = (uri: string | null) => {

        if (uri) {
            setImage(uri)
            setViewMode('preview')
        }

    }

    const saveImage = async (temporalUri: string | null) => {


        // ...validate temporalUri 
        if (!temporalUri) return;


        try {

            const finalUri = await saveImagePermanentStorage(temporalUri);
            const imageId = await insertoIntoDatabase(finalUri);

            router.back();

            if (imageId) {
                router.setParams({
                    galleryType: "topClothes",
                    imageId: imageId
                })
            }


        } catch (error) {
            console.log("Error al guardar la imagen ", error);
        }


    }

    const saveImagePermanentStorage = async (temporalUri: string): Promise<string | null> => {

        try {

            const fileInfo = await FileSystem.getInfoAsync(temporalUri);

            // ...validate temporalUri 
            if (!fileInfo.exists) return null;

            // Definir la URI final en el directorio de documentos
            const finalUri = `${FileSystem.documentDirectory}/images/${new Date().getTime()}.jpg`;


            // Mover el archivo usando FileSystem
            await FileSystem.copyAsync({
                from: temporalUri,
                to: finalUri,
            });

            return finalUri;

        } catch (error) {
            console.error('Error al mover la imagen:', error);
            throw error; // Re-lanzar el error si es necesario manejarlo a nivel superior
        }

    }

    const insertoIntoDatabase = async (finalUri: string | null): Promise<number | null> => {

        if (!finalUri) return null;

        const insertImage = `INSERT INTO ${Tables.TOP_CLOTHING} (uri) VALUES ('${finalUri}')`
        await db.execAsync(insertImage);

        const selectQuery = `
            SELECT id 
            FROM ${Tables.TOP_CLOTHING} 
            WHERE uri = ?`

        const newCreatedImage = await db.getFirstAsync<TopClothingType>(selectQuery, [finalUri]);

        return newCreatedImage?.id || null;

    }

    const updateClothingName = (newValue: string) => {
        setClothingName(newValue)
    }

    const onChangeCategory = (categoryItem: string) => {
        setSelectedCategoryItem(categoryItem)
    }


    // --------------- return  --------------- //
    return {


        // ... atributes
        image,
        viewMode,
        clothingName,
        categoryList,
        selectedCategoryItem,


        // ... methods
        openGallery,
        openCamera,
        takePicture,
        saveImage,
        saveImagePermanentStorage,
        insertoIntoDatabase,
        updateClothingName,
        onChangeCategory,
    }



}

export default useAddClouthingViewModel