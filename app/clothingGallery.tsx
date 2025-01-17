import { FlatList, Image, StyleSheet, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ScreenCmp from './ui/components/ScreenCmp'
import ButtonCmp from './ui/components/ButtonCmp'
import { useSQLiteContext } from 'expo-sqlite'
import * as FileSystem from 'expo-file-system'
import { TopClothingType } from './db/TableTypes'

import { Tables } from './db/TableNames'
const { TOP_CLOTHING } = Tables


const clothingGallery = () => {


    // --------------- hooks --------------- //
    const router = useRouter()
    const { imageId } = useLocalSearchParams()
    const db = useSQLiteContext()


    const [clothingList, setClothingList] = useState<TopClothingType[]>([])




    // --------------- effects --------------- //

    // ... first render
    useEffect(() => {
        getAllClothing()
    }, [])

    // ... if imageId is provided, get the unique image
    useEffect(() => {
        if (imageId) {
            getAllClothing(imageId as string)
        }
    }, [imageId])




    // --------------- methods --------------- //

    const navigateToAddClothing = () => {
        router.navigate("/ui/screens/addClothingScreen")
    }

    const getAllClothing = async (imageId?: string) => {

        try {

            const imagesResult: TopClothingType[] = imageId
                ? [...clothingList, await getUniqueDBImage(imageId)]
                : await getAllDBImages();

            if (imagesResult.length > 0) {
                setClothingList(imagesResult)
            }


        } catch (error) {
            console.log("Error al obtener las prendas ", error);
        }

    }

    const getAllDBImages = async () => {
        const query = `SELECT * FROM ${TOP_CLOTHING}`
        const result = await db.getAllAsync<TopClothingType>(query)
        const validImages = await validateUriImages(result)

        return validImages
    }

    const getUniqueDBImage = async (imageId: string) => {
        const query = `SELECT * FROM ${TOP_CLOTHING} WHERE id = ${imageId}`
        const result = await db.getAllAsync<TopClothingType>(query)

        const validImage = await validateUriImages([result[0]])

        return validImage[0]
    }

    const validateUriImages = async (imageList: TopClothingType[]) => {

        const validImages = await Promise.all(
            imageList.map(async (image) => {

                if (!image.uri) return null;
                const fileInfo = await FileSystem.getInfoAsync(image.uri);

                return fileInfo.exists ? image : null;
            })

        ).then(results => results.filter(image => image !== null));

        return validImages
    }

    const renderItem = (item: TopClothingType) => {
        return (
            <Image
                source={{ uri: item.uri }}
                resizeMode="contain"
                style={{
                    flex: 1,
                    borderWidth: 1,
                    height: 100,
                }}

            />
        )
    }



    return (
        <ScreenCmp>

            <Text>Galeria</Text>


            {/* galleria de imagenes */}
            <FlatList
                data={clothingList}
                renderItem={({ item }) => renderItem(item)}
                style={{ flex: 1, borderWidth: 1, marginVertical: 8 }}
                numColumns={3}
            />

            <ButtonCmp
                onPress={navigateToAddClothing}
                text="Agregar"
            />

        </ScreenCmp>
    )
}


const localStyles = StyleSheet.create({
    
    
    
})


export default clothingGallery