import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import Colors from '../constants/colors';
import IconImage from './icons/IconImage';
import { circleMinus } from "app/ui/iconImages"
import { container } from 'tsyringe';
import { Translation, TranslationKeys } from '../i18n';

const translation = container.resolve(Translation);

interface SearchCmpProps {
  value: string,
  onDeleteSearch: () => void;
  onChangeText: (value: string) => void
}

const SearchCmp = ({
  value,
  onChangeText,
  onDeleteSearch,
}: SearchCmpProps) => {

  return (
    <View style={localStyles.container}>


      {/* text input para buscar la palabra clave */}
      <TextInput
        style={localStyles.textInputStyle}
        placeholderTextColor={Colors.GRAY}
        placeholder={translation.translate(TranslationKeys.searchChothingPlaceholder)}//'Pantalon o camisa...'
        value={value}
        onChangeText={onChangeText}
      />

      {/* icono de eliminar busqueda */}
      <IconImage
        source={circleMinus}
        color={Colors.GRAY}
        size={32}
        onPress={onDeleteSearch}
      />

    </View>
  )
}

const localStyles = StyleSheet.create({

  container: {
    flexDirection: "row",
    flex:1,
    maxHeight: 50,
    borderWidth: 1,
    height: 60,
    borderRadius: 8,
    padding: 4,
    alignItems: "center",
  },

  textInputStyle: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 8,
    borderRadius: 8
  }

})


export default SearchCmp