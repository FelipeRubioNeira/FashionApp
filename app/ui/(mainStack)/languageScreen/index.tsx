import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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

      <LabelCmp labelValue={`${translation.translate( TranslationKeys.selectLanguage)}:`} />

      <SpacerCmp marginVertical={"8%"} />

      <FlagIcon
        source={spainFlag}
        label='Español'
        onPress={()=>setLanguage(LanguageSelection.SPANISH)}
      />

      <SpacerCmp marginVertical={"8%"} />

      <FlagIcon
        source={usaFlag}
        label='English'
        onPress={()=>setLanguage(LanguageSelection.ENGLISH)}
      />

      <SpacerCmp marginVertical={"8%"} />


    </ScreenCmp>
  )
}

// ------------------ styles ------------------ //
const localStyles = StyleSheet.create({

  flagContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  flag: {
    width: 100,
    height: 100
  }

})



export default SelectionLanguageScreen
