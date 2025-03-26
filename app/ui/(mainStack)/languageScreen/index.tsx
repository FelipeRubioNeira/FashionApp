import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScreenCmp from 'app/ui/components/ScreenCmp'
import LabelCmp from 'app/ui/components/LabelCmp'
import SpacerCmp from 'app/ui/components/SpacerCmp'
import { spainFlag, usaFlag } from 'app/ui/iconImages'
import useLanguageViewModel from './languageViewModel'
import { LanguageSelection } from '@/domain/types/Types'
import { container } from 'tsyringe'
import SetupLanguageUseCase from '@/domain/useCases/SetupLanguageUseCase'
import { Translation, TranslationKeys } from '@/ui/i18n'
import { FONT_FAMILY, FONT_SIZE } from '@/ui/constants/fonts'
import SeparatorCmp from '@/ui/components/SeparatorCmp'


type FlatIconProps = {
  source: ImageSourcePropType,
  onPress: () => void,
  label: string,
}

const setupLanguageUseCase = container.resolve(SetupLanguageUseCase)
const translation = container.resolve(Translation);


const SelectionLanguageScreen = () => {

  // ------------------ hooks ------------------ //
  const {
    // atributes

    // methods
    setLanguage,
  } = useLanguageViewModel(setupLanguageUseCase)



  // ------------------ components ------------------ //
  const FlagIcon = ({
    source,
    onPress,
    label
  }: FlatIconProps) => {

    return (
      <View style={localStyles.flagContainer}>

        <LabelCmp
          labelValue={label}
          style={localStyles.label}
        />

        <SpacerCmp marginVertical={"2%"} />

        <TouchableOpacity onPress={onPress}>
          <Image
            source={source}
            style={localStyles.flag}
            resizeMode='contain'
          />
        </TouchableOpacity>

      </View>
    )
  }


  // ------------------ render ------------------ //
  return (
    <ScreenCmp>

      <LabelCmp
        labelValue={`${translation.translate(TranslationKeys.selectLanguage)}:`}
        style={localStyles.title}
      />

      <SeparatorCmp style={{ marginVertical: "8%" }} />

      <FlagIcon
        source={spainFlag}
        label='Español'
        onPress={() => setLanguage(LanguageSelection.SPANISH)}
      />

      <SeparatorCmp style={{ marginVertical: "8%" }} />

      <FlagIcon
        source={usaFlag}
        label='English'
        onPress={() => setLanguage(LanguageSelection.ENGLISH)}
      />

      <SeparatorCmp style={{ marginVertical: "8%" }} />


    </ScreenCmp>
  )
}

// ------------------ styles ------------------ //
const localStyles = StyleSheet.create({

  title: {
    fontFamily: FONT_FAMILY.PLAYFAIR_BOLD,
    fontSize: FONT_SIZE.XLARGE,
    textAlign: "center",
    marginTop: "4%"
  },
  flagContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: FONT_SIZE.LARGE,
    fontFamily: FONT_FAMILY.PLAYFAIR_REGULAR,
    color: "#000",
    textAlign: "center",
  },
  flag: {
    width: 100,
    height: 100
  }

})



export default SelectionLanguageScreen
