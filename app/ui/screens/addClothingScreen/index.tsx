import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import ButtonCmp from '../../components/ButtonCmp'
import CamaraViewCmp from '../../components/CamaraViewCmp'
import ScreenCmp from '../../components/ScreenCmp'
import TextInputCmp from '../../components/TextInputCmp'
import LabelCmp from '../../components/LabelCmp'
import useAddClouthingViewModel from './addClothingViewModel'
import ClothingCategoryCmp from '../../components/ClothingCategoryCmp'
import SpacerCmp from '../../components/SpacerCmp'




// --------------- component --------------- //
const addClothing = () => {


    // --------------- hooks --------------- //
    const {
        // atributes
        image,
        viewMode,
        clothingName,
        categoryList,
        selectedCategoryItem,

        // methods
        openGallery,
        openCamera,
        saveImage,
        takePicture,
        updateClothingName,
        onChangeCategory,
    } = useAddClouthingViewModel();





    // --------------- render --------------- //
    return (
        <ScreenCmp>


            {/* ----------------- titulo ----------------- */}
            <Text>Agregar nueva ropa</Text>



            {/* ----------------- botones para galeria y camara ----------------- */}
            <View style={localStyles.buttonContainer}>
                <ButtonCmp
                    text="Abrir Galleria"
                    onPress={openGallery}
                    style={{ marginRight: 5, flex: 1 }}
                />

                <ButtonCmp
                    text="Abrir Camara"
                    onPress={openCamera}
                    style={{ marginLeft: 5, flex: 1 }}
                />
            </View>



            {/* ----------------- imagen ----------------- */}
            <View style={localStyles.image}>

                {viewMode === 'preview' && image && <Image
                    source={{ uri: image }}
                    style={localStyles.image}
                    resizeMode="contain"
                />}

                {viewMode === 'camera' && <CamaraViewCmp onTakePicture={takePicture} />}

            </View>


            {/* ----------------- nombre de la prenda ----------------- */}
            <TextInputCmp
                label={<LabelCmp labelValue='Nombre de prenda' />}
                onChangeText={updateClothingName}
                placeholder='Ingrese nombre'
                inputValue={clothingName}
            />


            <SpacerCmp marginVertical={8} />



            <LabelCmp labelValue='Tipo de prenda' />
            <SpacerCmp marginVertical={4} />
            <ClothingCategoryCmp
                categoryList={categoryList}
                onChangeCategory={onChangeCategory}
                selectedValue={selectedCategoryItem}
            />



            <SpacerCmp marginVertical={8} />



            <LabelCmp labelValue='Categoria' />



            {/* ----------------- boton para guardar ----------------- */}
            <ButtonCmp
                style={localStyles.saveButton}
                text="Guardar"
                onPress={() => saveImage(image)}
            />


        </ScreenCmp>
    )
}



// --------------- styles --------------- //
const localStyles = StyleSheet.create({

    image: {
        width: "100%",
        height: 300,
        borderRadius: 10,
        borderWidth: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    saveButton: {
        marginVertical: 10,
        backgroundColor: Colors.primary
    }

})



export default addClothing