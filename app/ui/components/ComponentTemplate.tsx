import { StyleSheet, View } from 'react-native'
import React from 'react'


// --------------- properties --------------- //
interface ComponentProps {
    prop1: string,
    prop2: number
}



// --------------- component --------------- //
const CompomentTemplate = ({ prop1, prop2 }: ComponentProps) => {

    return (
        <View style={localStyles.screen}>

        </View>
    )
}

export default CompomentTemplate



// ------------------ styles ------------------ //
const localStyles = StyleSheet.create({

    screen: {
        flex: 1
    }

})



