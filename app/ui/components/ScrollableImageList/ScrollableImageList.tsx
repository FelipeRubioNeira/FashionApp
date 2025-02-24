import { FlatList, StyleSheet, View, ViewStyle, Image, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { screenWidth } from '../../constants/ScreenDimensions'
import { useRouter } from 'expo-router';
import { Clothing } from '@/app/domain/Types';
import useScrollableImageListViewModel from './ScrollableImageListViewModel';
import IconDefault from '../icons/IconDefault';


// --------------- types --------------- //


interface ScrollableImageListProps {
    style?: ViewStyle,
    clothingList: Clothing[],
    onPressClothing: (clothing: Clothing) => void,
    onPressDeleteClothing: (clothing: Clothing) => void
}


// --------------- component --------------- //
const ScrollableImageList = ({
    style,
    clothingList,
    onPressClothing,
    onPressDeleteClothing
}: ScrollableImageListProps) => {


    // --------------- viewModel --------------- //
    const {
        isScrolling,
        handleScroll,
        handleScrollEnd,
        localClothingList,
        flatListRef

        // ...
    } = useScrollableImageListViewModel({ clothingList })



    // --------------- methods --------------- //
    const renderItem = (clothing: Clothing) => {

        const { uri } = clothing

        return (
            <Pressable
                style={({ pressed }) => ({ ...localStyles.item, opacity: pressed ? 0.5 : 1 })}
                onStartShouldSetResponder={() => !isScrolling}
                onPress={() => onPressClothing(clothing)}
            >

                <Image
                    source={{ uri }}
                    resizeMode='center'
                    style={{ width: "100%", height: "100%" }}
                />

                <IconDefault
                    name='delete'
                    style={{
                        position: "absolute",
                        left: 25,
                        bottom: 10
                    }}
                    onPress={() => onPressDeleteClothing(clothing)}
                />

            </Pressable >
        )
    }


    // --------------- render --------------- //
    return (
        <View style={[localStyles.container, style]}>

            <FlatList
                ref={flatListRef}
                data={localClothingList}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => renderItem(item)}
                snapToInterval={screenWidth}
                snapToAlignment="center"
                decelerationRate="fast"
                onScrollBeginDrag={handleScroll}
                onScrollEndDrag={handleScrollEnd}
            />

        </View>
    )
}



// ------------------ styles ------------------ //
const localStyles = StyleSheet.create({

    container: {
        width: "100%",
        borderWidth: 1,
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



