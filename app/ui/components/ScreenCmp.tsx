import { StyleSheet} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

interface ScreenCmpProps {
    children?: React.ReactNode
}

const ScreenCmp = ({ children }: ScreenCmpProps) => {

    return (
        <SafeAreaView style={localStyles.screen}>
            {children}
        </SafeAreaView>
    )
}

export default ScreenCmp



// ------------------ styles ------------------ //
const localStyles = StyleSheet.create({

    screen: {
        width: "100%",
        height:"100%",
        flex: 1,
    }

})