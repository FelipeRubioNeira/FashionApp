import { FlatList, StyleSheet, View, ViewStyle, Image, Pressable } from 'react-native'
import React from 'react'
import { screenWidth } from '../ScreenDimensions'
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { ClothingItemType, ClothingType } from '../../db/TableTypes';



// --------------- types --------------- //


interface ScrollableImageListProps {
    style?: ViewStyle,
    clothingList: ClothingItemType[],
    galleryType: ClothingType
}




// --------------- component --------------- //
const ScrollableImageList = ({
    style,
    clothingList,
    galleryType
}: ScrollableImageListProps) => {

    const router = useRouter()



    // --------------- methods --------------- //
    const renderItem = ({ uri }: ClothingItemType) => {
        return (
            <View style={localStyles.item}>

                <Image
                    source={{ uri}}
                    resizeMode='contain'
                    style={{ width: "100%", height: "100%" }}
                />

            </View>
        )
    }

    const openGallery = (galleryType: ClothingType) => {
        router.navigate({
            pathname: "/clothingGallery",
            params: {
                galleryType,
            }
        })
    }



    // --------------- render --------------- //
    return (
        <View style={[localStyles.container, style]}>

            <Pressable onPress={() => openGallery(galleryType)} >
                <Feather
                    name="search"
                    size={32}
                    color="black"
                />
            </Pressable>

            <FlatList
                data={clothingList}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => renderItem(item)}
                snapToInterval={screenWidth}
                snapToAlignment="center"
                decelerationRate="fast"
            />

        </View>
    )
}



// ------------------ styles ------------------ //
const localStyles = StyleSheet.create({

    container: {
        width: "100%",
    },

    item: {
        width: screenWidth,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 32,
        borderWidth: 1,
    },

    title: {
        color: "black",
        textAlign: "center"
    }

})


export default ScrollableImageList



