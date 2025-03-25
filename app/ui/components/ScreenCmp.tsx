import { ScrollView, StyleSheet, ViewStyle, SafeAreaView } from 'react-native'
import React from 'react'
import Colors from '../constants/colors'

interface ScreenCmpProps {
    children?: React.ReactNode,
    style?: ViewStyle,
    scrollable?: boolean
}

const ScreenCmp = ({
    children,
    style,
    scrollable = false
}: ScreenCmpProps) => {

    const renderScrollableScreen = () => {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ padding: 8 }}
            >
                {children}
            </ScrollView>
        )
    }


    return (
        <SafeAreaView style={[localStyles.screen, { padding: scrollable ? 0 : 8 }, style]}>
            {scrollable ? renderScrollableScreen() : children}
        </SafeAreaView >
    )
}

export default ScreenCmp



// ------------------ styles ------------------ //
const localStyles = StyleSheet.create({

    screen: {
        width: "100%",
        height: "100%",
        flex: 1,
        backgroundColor:Colors.SAND
    }

})