import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import SearchIcn from './icons/SearchIcn';
import Colors from '../constants/colors';


interface SearchCmpProps {
  onSearch: () => void;
  onChangeText: (value: string) => void
}

const SearchCmp = ({
  onSearch,
  onChangeText
}: SearchCmpProps) => {

  return (
    <View style={localStyles.container}>


      {/* text input para buscar la palabra clave */}
      <TextInput
        style={localStyles.textInputStyle}
        placeholderTextColor={Colors.GRAY}
        placeholder='Pantalon o camisa...'
        onChangeText={onChangeText}
      />

      {/* icono de busqueda */}
      <SearchIcn
        color={Colors.GRAY}
        onPress={onSearch}
      />

    </View>
  )
}

export default SearchCmp

const localStyles = StyleSheet.create({

  container: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 1,
    height: 60,
    borderRadius: 8,
    padding: 4
  },

  textInputStyle: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 8,
    borderRadius: 8
  }

})