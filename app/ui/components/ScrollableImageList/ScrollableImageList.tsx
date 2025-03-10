import { FlatList, StyleSheet, View, ViewStyle, Pressable, ImageBackground } from 'react-native'
import React from 'react'
import { screenWidth } from '../../constants/screenDimensions'
import { Clothing } from '@/domain/Types';
import useScrollableImageListViewModel from './ScrollableImageListViewModel';
import IconImage from '../icons/IconImage';
import { lock, lockOpen } from '@/ui/iconImages';
import Colors from '@/ui/constants/colors';


// --------------- types --------------- //


interface ScrollableImageListProps {
    style?: ViewStyle,
    clothingList: Clothing[],
    initialValue?: number,
    lockedRow: boolean,
    onPressClothing: (clothing: Clothing) => void,
    onPressDeleteClothing?: (clothing: Clothing) => void,
    onChangeClothing: (clothingId: number) => void,
    onPressLock: () => void,
}


interface LockProps {
    isLocked: boolean,
    onPress: () => void,
}


// --------------- component --------------- //
const ScrollableImageList = ({
    style,
    initialValue,
    clothingList,
    onPressClothing,
    onChangeClothing,
    lockedRow,
    onPressLock
}: ScrollableImageListProps) => {


    // --------------- viewModel --------------- //
    const {
        isScrolling,
        handleScroll,
        handleScrollEnd,
        flatListRef,
        calculateItemId
        // ...
    } = useScrollableImageListViewModel({ clothingList, initialValue })



    // --------------- methods --------------- //
    const renderItem = (clothing: Clothing) => {

        const { uri } = clothing

        return (
            <View
                key={clothing.id.toString()}
                style={localStyles.item}
            >

                {/* foto de la prenda */}
                <Pressable
                    key={clothing.id.toString()}
                    style={({ pressed }) => ({ flex: 1, opacity: pressed ? 0.5 : 1, })}
                    onStartShouldSetResponder={() => !isScrolling}
                    onPress={() => onPressClothing(clothing)}
                >

                    <View style={localStyles.itemContainer}>

                        <View style={{ flex: 2 }}></View>

                        <ImageBackground
                            key={clothing.id.toString()}
                            source={{ uri }}
                            resizeMode='center'
                            style={localStyles.clothingImage}
                        >

                            <Lock
                                isLocked={lockedRow}
                                onPress={onPressLock}
                            />

                        </ImageBackground>

                        <View style={{ flex: 2 }}></View>

                    </View>

                </Pressable>

            </View >
        )
    }

    const Lock = ({
        isLocked = false,
        onPress = () => { },
    }: LockProps) => {


        return (
            <IconImage
                onPress={onPress}
                source={isLocked ? lock : lockOpen}
                color={Colors.GRAY_TRANSPARENT}
                size={24}
            />
        )
    }



    // --------------- render --------------- //
    return (
        <View style={[localStyles.container, style]}>
            <FlatList
                key={clothingList.map(c => c.id).join('-')} // fuerza re-montaje al cambiar el listado
                ref={flatListRef}
                data={clothingList}
                renderItem={({ item }) => renderItem(item)}
                keyExtractor={({ id }) => id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={screenWidth}
                snapToAlignment="center"
                decelerationRate="fast"
                onScrollBeginDrag={handleScroll}
                onScrollEndDrag={handleScrollEnd}
                onMomentumScrollEnd={event => {
                    const itemId = calculateItemId(event.nativeEvent.contentOffset.x)
                    if (itemId) onChangeClothing(itemId)
                }}
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
    },

    itemContainer: {
        flex: 1,
        flexDirection: "row"
    },

    clothingImage: {
        flex: 5,
    }

})


export default ScrollableImageList



