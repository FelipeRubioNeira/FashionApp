import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import useMyOutfitsViewModel from './myOutfitsViewModel'
import ScreenCmp from 'app/ui/components/ScreenCmp'
import { FlatList } from 'react-native-gesture-handler'
import { container } from 'tsyringe'

import { screenWidth } from '@/ui/constants/ScreenDimensions'
import LabelCmp from 'app/ui/components/LabelCmp'
import measures from 'app/ui/constants/measures'
import Colors from 'app/ui/constants/colors'
import { clothesRack, copy, edit, x } from 'app/ui/iconImages'
import IconImage from 'app/ui/components/icons/IconImage'

import {
  types,
  useCases
} from "@/domain"
import ModalCmp from '@/ui/components/modal/ModalCmp'
import globalStyles from '@/ui/constants/globalStyles/globalStyles'
import SeparatorCmp from '@/ui/components/SeparatorCmp'



const getOutfitsUseCase = container.resolve(useCases.GetOutfitsUseCase)
const deleteOutfitUseCase = container.resolve(useCases.DeleteOutfitUseCase)
const duplicateOutfitUseCase = container.resolve(useCases.DuplicateOutfitUseCase)




const index = () => {

  // ----------- viewModel ----------- //
  const {
    outfits,
    onPressDeleteOutfit,
    onPressEditOutfit,
    onPressDuplicateOutfit,
    modal
  } = useMyOutfitsViewModel(getOutfitsUseCase, deleteOutfitUseCase, duplicateOutfitUseCase)




  const Card = (outfit: types.Types.Outfit) => {


    // outfit data
    const {
      id,
      name,
      topClothing,
      bottomClothing,
      shoes
    } = outfit

    const { uri: uriTop } = topClothing
    const { uri: uriBottom } = bottomClothing
    const { uri: uriShoes } = shoes


    return (
      <>
        <View style={localStyles.containerCard}>

          <View style={localStyles.card}>

            <SeparatorCmp style={{ ...localStyles.separator, marginTop: "6%" }} />


            <View style={localStyles.headerContainerIcons}>


              {/* eliminar */}
              <IconImage
                containerStyle={{ flex: 1 }}
                source={x}
                size={24}
                color={Colors.GRAY}
                onPress={() => onPressDeleteOutfit(id)}
              />


              {/* duplicar  */}
              <IconImage
                containerStyle={{ flex: 1 }}
                source={copy}
                size={24}
                color={Colors.OLD_GOLD}
                onPress={() => onPressDuplicateOutfit(id)}
              />


              {/* editar */}
              <IconImage
                containerStyle={{ flex: 1 }}
                source={clothesRack}
                size={24}
                color={Colors.GRAY}
                onPress={() => onPressEditOutfit(outfit)}
              />

            </View>


            <SeparatorCmp style={{ ...localStyles.separator }} />




            <View style={localStyles.title}>
              <LabelCmp labelValue={name} style={{ textAlign: "center" }} />
            </View>

            <Image
              source={{ uri: uriTop }}
              resizeMode='center'
              style={{ flex: 3 }}
            />

            <Image
              source={{ uri: uriBottom }}
              resizeMode='center'
              style={{ flex: 3 }}
            />


            <Image
              source={{ uri: uriShoes }}
              resizeMode='center'
              style={{ flex: 1 }}
            />




          </View>

        </View>

        <ModalCmp {...modal.config} />

      </>
    )
  }

  return (
    <ScreenCmp style={{ padding: 0 }}>

      <FlatList
        key={outfits.map(c => c.id).join('-')} // fuerza re-montaje al cambiar el listado
        data={outfits}
        renderItem={({ item }) => Card(item)}
        keyExtractor={({ id }) => id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToInterval={screenWidth}
        snapToAlignment="center"
        decelerationRate="fast"
      />


    </ScreenCmp>
  )
}


const localStyles = StyleSheet.create({

  mainContainer: {
    flex: 1,
  },

  contentContainer: {
    paddingHorizontal: 20, // Espacio horizontal dentro del FlatList
    paddingVertical: 25, // Espacio vertical dentro del FlatList,
  },
  containerCard: {
    height: "100%",
    width: screenWidth, // Ancho fijo para las tarjetas,
    padding: 20,
    backgroundColor: Colors.SAND,
  },
  card: {
    height: "100%",
    width: "100%",
    //marginHorizontal: 10, // Margen entre tarjetas
    backgroundColor: Colors.SAND, // Color de fondo de la tarjeta
    borderRadius: 16, // Borde redondeado

    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.21,
    shadowRadius: 7.68,
    elevation: 10

  },
  title: {
    height: measures.TITLE_HEIGTH,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10
  },

  buttonContainer: {
    position: "absolute",
    height: measures.BUTTON_HEIGTH * 0.8,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    right: 10,
    bottom: 10,
    backgroundColor: Colors.GRAY,
    borderRadius: measures.BUTTON_HEIGTH / 2
  },
  iconContainer: {
    borderRadius: 100,
    padding: 10,
    borderColor: Colors.GRAY_TRANSPARENT,
    backgroundColor: Colors.WHITE,
    ...globalStyles.SHADOW
  },
  headerContainerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: "4%",
  },
  separator: {
    width: screenWidth * 0.8,
  },


})


export default index
