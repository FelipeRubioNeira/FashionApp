import * as ImagePicker from 'expo-image-picker'

const useGalleryViewCmp = () => {


    // --------------- methods --------------- //
    const showGallery = async (): Promise<string | null> => {

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
            allowsMultipleSelection: false,
        });

        if (result.canceled || result.assets.length === 0) {
            return null

        } else {
            return result.assets[0].uri
        }

    }


    // --------------- export --------------- //
    return {
        showGallery
    }

}

export default useGalleryViewCmp