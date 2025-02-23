import { FlatList, StyleSheet, View, ViewStyle, Image, Pressable } from 'react-native'
import React from 'react'
import { screenWidth } from '../constants/ScreenDimensions'
import { useRouter } from 'expo-router';
import { ClothingItemType, ClothingType } from '../../data/db/TableTypes';
import { Clothing } from '@/app/domain/Types';



// --------------- types --------------- //


interface ScrollableImageListProps {
    style?: ViewStyle,
    clothingList: Clothing[],
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
    const renderItem = ({ uri }: Clothing) => {
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


    // --------------- render --------------- //
    return (
        <View style={[localStyles.container, style]}>

            <FlatList
                data={clothingList}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.uri}
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
        borderWidth:1,
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



