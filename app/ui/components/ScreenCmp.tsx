import { StyleSheet, ViewStyle } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

interface ScreenCmpProps {
    children?: React.ReactNode,
    style?: ViewStyle
}

const ScreenCmp = ({ children, style }: ScreenCmpProps) => {

    return (
        <SafeAreaView style={[localStyles.screen, style]}>
            {children}
        </SafeAreaView>
    )
}

export default ScreenCmp



// ------------------ styles ------------------ //
const localStyles = StyleSheet.create({

    screen: {
        width: "100%",
        height: "100%",
        flex: 1,
        padding: 8
    }

})