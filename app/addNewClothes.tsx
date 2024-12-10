import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ScreenCmp from './ui/components/ScreenCmp'
import ButtonCmp from './ui/components/ButtonCmp'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import * as ImagePicker from 'expo-image-picker';


// --------------- component --------------- //
const addNewClothes = () => {


    // --------------- state --------------- //
    const [image, setImage] = useState<string | null>(null)



    // --------------- methods --------------- //
    const openGallery = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
            allowsMultipleSelection: false,
            //aspect: [3, 4],
        });

        if (result.canceled) {
            console.log("User canceled image picker")
            return
        }

        setImage(result.assets[0].uri)
    }

    const saveImage = () => {
        console.log("saveImage")
    }


    // --------------- render --------------- //
    return (
        <ScreenCmp>

            <Text>Agregar nueva ropa</Text>

            <ButtonCmp
                style={{ marginVertical: 10 }}
                text="Abrir Galleria"
                onPress={openGallery}
            />

            <View style={localStyles.image}>
                {image && <Image
                    source={{ uri: image }}
                    style={localStyles.image}
                    resizeMode="contain"
                />}
            </View>

            <ButtonCmp
                style={{ marginVertical: 10, backgroundColor: Colors.primary }}
                text="Guardar"
                onPress={saveImage}
            />

        </ScreenCmp>
    )
}

export default addNewClothes

const localStyles = StyleSheet.create({

    image: {
        flex: 1,
        borderWidth: 1,
    }

})