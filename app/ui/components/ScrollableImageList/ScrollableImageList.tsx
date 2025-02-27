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
    onPressDeleteClothing: (clothing: Clothing) => void,
    onChangeClothing: (clothingId: number) => void
}

interface DeleteIconProps {
    onPress: () => void
}



// --------------- component --------------- //
const ScrollableImageList = ({
    style,
    clothingList,
    onPressClothing,
    onPressDeleteClothing,
    onChangeClothing
}: ScrollableImageListProps) => {


    // --------------- viewModel --------------- //
    const {
        isScrolling,
        handleScroll,
        handleScrollEnd,
        flatListRef,
        calculateItemId
        // ...
    } = useScrollableImageListViewModel(clothingList)



    // --------------- methods --------------- //
    const renderItem = (clothing: Clothing) => {

        const { uri } = clothing

        return (
            <View style={localStyles.item}>

                {/* lado izquierdo de la pantalla */}
                <View style={localStyles.leftSide}>
                    <DeleteIcon onPress={() => onPressDeleteClothing(clothing)} />
                </View>


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


                {/* lado derecho */}
                <View style={localStyles.rightSide}></View>

            </View >
        )
    }

    const DeleteIcon = ({ onPress }: DeleteIconProps) => {

        return (
            <IconDefault
                name='delete'
                onPress={onPress}
            />
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
                onScroll={event => onChangeClothing(calculateItemId(event.nativeEvent.contentOffset.x))}
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



