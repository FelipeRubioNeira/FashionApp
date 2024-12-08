import { FlatList, StyleSheet, View, ViewStyle, Text } from 'react-native'
import React from 'react'
import { screenWidth } from '../ScreenDimensions'
import { SvgProps } from 'react-native-svg';




// --------------- properties --------------- //
interface ScrollableImageListProps {
    style?: ViewStyle,
    clotheList: Array<ClotheType>,
}

export type ClotheType = {
    name: string,
    Image: React.FC<SvgProps>,
    componente?: React.Component
}


// --------------- component --------------- //
const ScrollableImageList = ({ style, clotheList = [] }: ScrollableImageListProps) => {


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

    return (
        <View style={[localStyles.container, style]}>
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

export default ScrollableImageList


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
        backgroundColor:"orange"
    },
    title: {
        color: "black",
        textAlign: "center"
    }

})



