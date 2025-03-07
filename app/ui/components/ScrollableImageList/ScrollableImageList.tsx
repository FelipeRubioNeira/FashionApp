import { FlatList, StyleSheet, View, ViewStyle, Image, Pressable } from 'react-native'
import React from 'react'
import { screenWidth } from '../../constants/ScreenDimensions'
import { Clothing } from '@/domain/Types';
import useScrollableImageListViewModel from './ScrollableImageListViewModel';
import IconDefault from '../icons/IconDefault';


// --------------- types --------------- //


interface ScrollableImageListProps {
    style?: ViewStyle,
    clothingList: Clothing[],
    initialValue?: number,
    onPressClothing: (clothing: Clothing) => void,
    onPressDeleteClothing?: (clothing: Clothing) => void,
    onChangeClothing: (clothingId: number) => void,
}

interface DeleteIconProps {
    onPress: () => void
}



// --------------- component --------------- //
const ScrollableImageList = ({
    style,
    clothingList,
    onPressClothing,
    onChangeClothing,
    initialValue
}: ScrollableImageListProps) => {


    // --------------- viewModel --------------- //
    const {
        isScrolling,
        handleScroll,
        handleScrollEnd,
        flatListRef,
        calculateItemId
        // ...
    } = useScrollableImageListViewModel(clothingList, initialValue)



    // --------------- methods --------------- //
    const renderItem = (clothing: Clothing) => {

        const { uri } = clothing

        return (
            <View style={localStyles.item}>

                {/* foto de la prenda */}
                <Pressable
                    style={({ pressed }) => ({ flex: 4, opacity: pressed ? 0.5 : 1 })}
                    onStartShouldSetResponder={() => !isScrolling}
                    onPress={() => onPressClothing(clothing)}
                >
                    <Image
                        source={{ uri }}
                        resizeMode='center'
                        style={{ flex: 1 }}
                    />
                </Pressable>

            </View >
        )
    }



    // --------------- render --------------- //
    return (
        <View style={[localStyles.container, style]}>
            <FlatList
                ref={flatListRef}
                data={clothingList}
                renderItem={({ item }) => renderItem(item)}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={screenWidth}
                snapToAlignment="center"
                decelerationRate="fast"
                onScrollBeginDrag={handleScroll}
                onScrollEndDrag={handleScrollEnd}
                onMomentumScrollEnd={event => onChangeClothing(calculateItemId(event.nativeEvent.contentOffset.x))}
                getItemLayout={(data, index) => (
                    { length: screenWidth, offset: screenWidth * index, index }
                )}

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
        flexDirection: "row",

    },

    title: {
        color: "black",
        textAlign: "center"
    },

    leftSide: {
        flex: 1,
        padding: 4,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    rightSide: {
        flex: 1
    }

})


export default ScrollableImageList



