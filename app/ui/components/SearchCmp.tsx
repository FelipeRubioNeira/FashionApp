import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import Colors from '../constants/colors';
import IconImage from './icons/IconImage';
import { circleMinus, x } from "app/ui/iconImages"
import { container } from 'tsyringe';
import { Translation, TranslationKeys } from '../i18n';
import { FONT_FAMILY, FONT_SIZE } from '../constants/fonts';
import measures from '../constants/measures';
import globalStyles from '../constants/globalStyles/globalStyles';

const translation = container.resolve(Translation);

interface SearchCmpProps {
  value: string,
  onDeleteSearch: () => void;
  onChangeText: (value: string) => void,
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
        source={x}
        color={Colors.GRAY_TRANSPARENT}
        size={24}
        onPress={onDeleteSearch}
        style={{ marginLeft: 8, marginRight: 8 }}
      />

    </View>
  )
}

const localStyles = StyleSheet.create({

  container: {
    flexDirection: "row",
    flex: 1,
    maxHeight: 50,
    borderWidth: .2,
    borderColor: Colors.GRAY,
    height: measures.BUTTON_HEIGTH,
    borderRadius: 8,
    padding: 4,
    alignItems: "center",
    backgroundColor: Colors.WHITE,
    ...globalStyles.SHADOW,
  },

  textInputStyle: {
    color: Colors.BLACK,
    flex: 1,
    paddingLeft: 8,
    borderRadius: 8,
    fontSize: FONT_SIZE.SMALL,
    fontFamily: FONT_FAMILY.POPPINS_LIGHT
  }

})


export default SearchCmp