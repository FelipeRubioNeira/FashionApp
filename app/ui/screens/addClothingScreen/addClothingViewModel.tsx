import { useEffect, useState } from 'react'
import useGalleryViewCmp from '../../components/GalleryViewCmp'
import { useLocalSearchParams, useRouter } from 'expo-router'
import * as FileSystem from 'expo-file-system';
import { Tables } from '../../../data/db/TableNames'
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import AddClothingUseCase from '@/app/domain/useCases/AddClothingUseCase';
import { Clothing, ClothingType } from '@/app/domain/Types';
import { DBConstants } from '@/app/data/db/DBConstants';
import { ScreenAddClothingParams } from '../../navigation/interfaces';
import EditClothingUseCase from '@/app/domain/useCases/EditClothingUseCase';



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
        type: ""
    })

    const [viewMode, setViewMode] = useState<'camera' | 'preview'>('preview')
    const { showGallery } = useGalleryViewCmp()
    const [categoryList] = useState<ClothingType[]>(['BOTTOM', 'TOP', 'SHOES'])
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

    const saveImage = async ({ uri, name, type, style }: Partial<Clothing>) => {

        // ...validate temporalUri 
        if (!uri) return;

        try {

            // 1. Guardar la nueva prenda en el almacenamiento permanente
            const finalUri = await saveImagePermanentStorage(uri);

            if (finalUri === null) return;

            // 2. Guardar la prenda en la base de datos
            const newImagedCreated = await addClothingUseCase.execute({
                id: 0,
                uri: finalUri,
                name: name || "",
                type: type || "",
                style: style || ""
            })

            if (!newImagedCreated) return;

            console.log("addClothing viewModel ", newImagedCreated)

            const { uri: imageUri } = newImagedCreated

            router.back();
            router.setParams({
                imageUri,
                clothingType: type
            })


        } catch (error) {
            console.log("Error al guardar la imagen ", error);
        }


    }

    // TODO: separar logica del viewModel
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

    const insertoIntoDatabase = async ({ name, style, type, uri }: Partial<Clothing>): Promise<number | null> => {

        try {

            if (!uri) return null;

            const db = await SQLite.openDatabaseAsync(DBConstants.DB_NAME);

            const insertImage = `INSERT INTO ${Tables.CLOTHING} 
            (uri, name, type, style) 
            VALUES ('${uri}', '${name}', '${type}', '${style}')`

            await db.execAsync(insertImage);

            const selectQuery = `
            SELECT id 
            FROM ${Tables.CLOTHING} 
            WHERE uri = ?`

            const newCreatedImage = await db.getFirstAsync<Clothing>(selectQuery, [uri]);

            console.log("newCreatedImage ", newCreatedImage);

            return newCreatedImage?.id || null;

        } catch (error) {
            console.log("Error al insertar en la bse de datos")
            return null
        }

    }

    const updateClothingName = (newValue: string) => {
        setNewClothing({ ...newClothing, name: newValue })
    }

    const onChangeCategory = (categoryItem: ClothingType) => {
        setNewClothing({ ...newClothing, type: categoryItem })
    }

    const fillClothingInformation = async (clothing: Clothing): Promise<void> => {

        console.log("ha llegado un id para editar ", clothing);

        if (!clothing) return

        setNewClothing({ ...clothing })

    }


    // --------------- return  --------------- //
    return {


        // ... atributes
        newClothing,
        viewMode,
        categoryList,

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