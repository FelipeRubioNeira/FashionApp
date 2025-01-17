import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { CameraCapturedPicture, CameraView, useCameraPermissions } from 'expo-camera'

// --------------- types --------------- //
type Props = {
    onTakePicture: (picture: string | null) => void;
}


// --------------- component --------------- //
const CamaraViewCmp = ({ onTakePicture }: Props) => {

    // --------------- state --------------- //
    const [permission, requestPermission] = useCameraPermissions();
    const camaraRef = useRef<CameraView>(null);


    const takePictureInternal = async () => {

        try {

            const result = await camaraRef.current?.takePictureAsync({
                quality: 1,

            });

            // call to the prop function
            if (result) onTakePicture(result.uri)
            else onTakePicture(null)

        } catch (error) {
            console.log("Error taking picture", error)
        }
    }


    // --------------- render --------------- //
    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View >
                <Text>We need your permission to show the camera</Text>
                <Pressable onPress={requestPermission}>
                    <Text>Otorgar permiso</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={localStyles.container}>

            <CameraView
                ref={camaraRef}
                style={{ flex: 1 }}
            >

                <Pressable
                    style={localStyles.button}
                    onPress={takePictureInternal}
                >
                    <Text >Tomar foto</Text>

                </Pressable>

            </CameraView>
        </View>
    )
}

export default CamaraViewCmp

const localStyles = StyleSheet.create({

    container: {
        flex: 1,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    }
})