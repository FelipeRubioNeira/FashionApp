import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenCmp from './ui/components/ScreenCmp'
import ButtonCmp from './ui/components/ButtonCmp'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import * as ImagePicker from 'expo-image-picker';
import { CameraView, CameraType, useCameraPermissions, } from 'expo-camera';

// --------------- component --------------- //
const addNewClothes = () => {


    // --------------- state --------------- //
    const [image, setImage] = useState<string | null>(null)
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const camaraRef = useRef<CameraView>(null);



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

    const openCamera = async () => {

    }

    const takePicture = async () => {

        try {
            let result = await camaraRef.current?.takePictureAsync({
                quality: 1,
            });

            console.log("result", result);
            

            if (result?.uri) {
                setImage(result.uri)
            }

        } catch (error) {
            console.log("Error taking picture", error)
        }
    }

    const saveImage = () => {
        console.log("saveImage")
    }




    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View >
                <Text>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
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
            <ButtonCmp
                style={{ marginVertical: 10 }}
                text="Abrir Camara"
                onPress={openCamera}
            />

            <View style={localStyles.image}>
                {image && <Image
                    source={{ uri: image }}
                    style={localStyles.image}
                    resizeMode="contain"
                />}
            </View>

            <CameraView
                ref={camaraRef}
                style={{ flex: 1 }}
                facing={facing}
                mode='picture'
            >
                <View style={localStyles.buttonContainer}>

                    <TouchableOpacity
                        style={localStyles.button}
                        onPress={takePicture}
                    >
                        <Text >Flip Camera</Text>

                    </TouchableOpacity>
                </View>
            </CameraView>

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
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },

})