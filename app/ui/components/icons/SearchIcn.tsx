import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/colors';
import Feather from '@expo/vector-icons/Feather';

interface SearchIcnProps {
    size?: number;
    color?: string;
    onPress: () => void;
}

const SearchIcn = ({
    size = 34,
    color = Colors.BLACK,
    onPress
}: SearchIcnProps) => {
    return (
        <TouchableOpacity
            style={localStyles.searchIconContainer}
            onPress={onPress}
        >
            <Feather
                name="search"
                size={size}
                color={color}
            />
        </TouchableOpacity>
    )
}

const localStyles = StyleSheet.create({

    searchIconContainer: {
        height: "100%",
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
        marginRight:4
    }

})

export default SearchIcn
