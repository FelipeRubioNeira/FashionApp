import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import useMyOutfitsViewModel from './myOutfitsViewModel'
import ScreenCmp from '@/ui/components/ScreenCmp'
import { FlatList } from 'react-native-gesture-handler'
import { container } from 'tsyringe'
import GetOutfitsUseCase from '@/domain/useCases/GetOutfitsUseCase'
import { Outfit } from '@/domain/Types'
import { screenWidth } from '@/ui/constants/screenDimensions'
import LabelCmp from '@/ui/components/LabelCmp'
import measures from '@/ui/constants/measures'
import Colors from '@/ui/constants/colors'
import IconDefault from '@/ui/components/icons/IconDefault'
import DeleteOutfitUseCase from '@/domain/useCases/DeleteOutfitUseCase'
import { ActionButton } from '@/ui/UITypes'
import { copyPlus, circleMinus, edit } from '@/ui/iconImages'
import IconImage from '@/ui/components/icons/IconImage'
import DuplicateOutfitUseCase from '@/domain/useCases/DuplicateOutfitUseCase'



const getOutfitsUseCase = container.resolve(GetOutfitsUseCase)
const deleteOutfitUseCase = container.resolve(DeleteOutfitUseCase)
const duplicateOutfitUseCase = container.resolve(DuplicateOutfitUseCase)


const index = () => {

  // ----------- viewModel ----------- //
  const {
    outfits,
    onPressDeleteOutfit,
    onPressEditOutfit,
    onPressDuplicateOutfit,
  } = useMyOutfitsViewModel(getOutfitsUseCase, deleteOutfitUseCase, duplicateOutfitUseCase)


  const Card = (outfit: Outfit) => {


    // outfit data
    const { id, name, topClothing, bottomClothing, shoes } = outfit
    const { uri: uriTop } = topClothing
    const { uri: uriBottom } = bottomClothing
    const { uri: uriShoes } = shoes


    return (
      <View style={localStyles.containerCard}>

        <View style={localStyles.card}>

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


          {/* editar */}
          <IconImage
            containerStyle={{ ...localStyles.iconContainer, bottom: 10, right: 10 }}
            source={edit}
            size={24}
            color={Colors.WHITE}
            onPress={() => onPressEditOutfit(outfit)}
          />


          {/* eliminar */}
          <IconImage
            containerStyle={{ ...localStyles.iconContainer, bottom: 10, left: 10 }}
            source={circleMinus}
            size={24}
            color={Colors.WHITE}
            onPress={() => onPressDeleteOutfit(id)}
          />


          {/* duplicar  */}
          <IconImage
            containerStyle={{ ...localStyles.iconContainer, top: 10, left: 10 }}
            source={copyPlus}
            size={24}
            color={Colors.WHITE}
            onPress={() => onPressDuplicateOutfit(id)}
          />

        </View>

      </View>
    )
  }

  const EditButton = ({
    onPress
  }: ActionButton) => {

    return (

      <TouchableOpacity
        style={localStyles.buttonContainer}
        onPress={onPress}>
        <IconDefault
          name='edit-2'
          color='white'
          disabled={true}
        />
      </TouchableOpacity>
    )

  }

  const DeleteButton = ({
    onPress
  }: ActionButton) => {

    return (

      <TouchableOpacity
        style={[localStyles.buttonContainer, { left: 10, right: undefined }]}
        onPress={onPress}
      >
        <IconDefault
          name='delete'
          color='white'
          disabled={true}
        />
      </TouchableOpacity>
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
    padding: 40,
  },
  card: {
    height: "100%",
    width: "100%",
    //marginHorizontal: 10, // Margen entre tarjetas
    backgroundColor: '#f0f0f0', // Color de fondo de la tarjeta
    borderRadius: 16, // Borde redondeado

    shadowColor: "#000000",
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
    position: "absolute",
    backgroundColor: Colors.GRAY_TRANSPARENT,
    borderRadius: 100,
    padding: 10
  }


})


export default index
