import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ScreenCmp from './ui/components/ScreenCmp'
import ButtonCmp from './ui/components/ButtonCmp'


const clothingGallery = () => {


    // --------------- hooks --------------- //
    const router = useRouter()
    const { galleryType } = useLocalSearchParams()

    // --------------- states --------------- //
    const [titleMessage, setTitleMessage] = useState("")


    // --------------- effects --------------- //
    useEffect(() => {
        setTitleMessage(`Galeria de ${galleryType}`)
    }, [])


    // --------------- methods --------------- //
    const renderItem = () => {
        return null
    }

    const navigateToAddNewClothes = () => {
        router.navigate("/addNewClothes")
    }



    return (
        <ScreenCmp>

            <Text>{titleMessage}</Text>


            {/* galleria de imagenes */}
            <FlatList
                data={[]}
                renderItem={renderItem}
                style={{ flex: 1, borderWidth: 1, marginVertical: 8 }}
            />

            <ButtonCmp
                onPress={navigateToAddNewClothes}
                text="Agregar"
            />

        </ScreenCmp>
    )
}

export default clothingGallery

const localStyles = StyleSheet.create({



})

