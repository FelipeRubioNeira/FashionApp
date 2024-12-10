import { FlatList, StyleSheet, View, ViewStyle, Text, Pressable } from 'react-native'
import React from 'react'
import { screenWidth } from '../ScreenDimensions'
import { SvgProps } from 'react-native-svg';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';




// --------------- types --------------- //

interface ScrollableImageListProps {
    style?: ViewStyle,
    clotheList: Array<ClotheType>,
    galleryType: GalleryType
}

type GalleryType = "top" | "bottom" | "shoes"

type ClotheType = {
    name: string,
    Image: React.FC<SvgProps>,
    componente?: React.Component
}


// --------------- component --------------- //
const ScrollableImageList = ({
    style,
    clotheList = [],
    galleryType
}: ScrollableImageListProps) => {

    const router = useRouter()



    // --------------- methods --------------- //
    const renderItem = ({ name, Image }: ClotheType) => {
        return (
            <View style={localStyles.item}>

                <Text style={localStyles.title}>
                    {name}
                </Text>

                <Image
                    width={"100%"}
                    height={"100%"}
                />

            </View>
        )
    }

    const openGallery = (galleryType: GalleryType) => {
        router.navigate({
            pathname: "/clothingGallery",
            params: {
                galleryType
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
                data={clotheList}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.name}
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

export type {
    GalleryType,
    ClotheType
}


