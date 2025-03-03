import { container } from 'tsyringe'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import ButtonCmp from '@/ui/components/ButtonCmp'
import CamaraViewCmp from '@/ui/components/CamaraViewCmp'
import ScreenCmp from '@/ui/components/ScreenCmp'
import TextInputCmp from '@/ui/components/TextInputCmp'
import LabelCmp from '@/ui/components/LabelCmp'
import useAddClouthingViewModel from './addClothingViewModel'
import ClothingCategoryCmp from '@/ui/components/ClothingCategoryCmp'
import SpacerCmp from '@/ui/components/SpacerCmp'
import AddClothingUseCase from '@/domain/useCases/AddClothingUseCase'
import EditClothingUseCase from '@/domain/useCases/EditClothingUseCase'
import StyleSelector from '@/ui/components/StyleSelector'


const addClothingUseCase = container.resolve(AddClothingUseCase)
const editClothingUseCase = container.resolve(EditClothingUseCase)


// --------------- component --------------- //
const addClothing = () => {


    // --------------- hooks --------------- //
    const {
        // atributes
        newClothing,
        viewMode,
        categoryList,
        ClothingStylesList,

        // methods
        openGallery,
        openCamera,
        saveImage,
        takePicture,
        updateClothingName,
        onChangeCategory,
        updateClothingStyle,
    } = useAddClouthingViewModel(addClothingUseCase, editClothingUseCase);





    // --------------- render --------------- //
    return (
        <ScreenCmp scrollable={true}>


            {/* ----------------- titulo ----------------- */}
            <LabelCmp labelValue='Agregar nueva ropa'></LabelCmp>



            {/* ----------------- botones para galeria y camara ----------------- */}
            <View style={localStyles.buttonContainer}>
                <ButtonCmp
                    text="Abrir Galeria"
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

                {viewMode === 'preview' && newClothing.uri && <Image
                    source={{ uri: newClothing.uri }}
                    style={localStyles.image}
                    resizeMode="contain"
                />}

                {viewMode === 'camera' && <CamaraViewCmp onTakePicture={takePicture} />}

            </View>


            {/* ----------------- nombre de la prenda ----------------- */}
            <TextInputCmp
                label={<LabelCmp labelValue='Nombre de prenda' />}
                placeholder='Ingrese nombre'
                inputValue={newClothing.name}
                onChangeText={updateClothingName}
            />


            <SpacerCmp marginVertical={8} />



            <LabelCmp labelValue='Tipo de prenda' />
            <SpacerCmp marginVertical={"2%"} />
            <ClothingCategoryCmp
                categoryList={categoryList}
                selectedValue={newClothing.type}
                onChangeCategory={onChangeCategory}
            />

            <SpacerCmp marginVertical={"2%"} />
            <LabelCmp labelValue='Estilo' />
            <StyleSelector
                styleList={ClothingStylesList}
                styleSelected={newClothing.style}
                onPress={updateClothingStyle}
            />


            {/* ----------------- boton para guardar ----------------- */}
            <ButtonCmp
                style={localStyles.saveButton}
                text="Guardar"
                onPress={() => saveImage(newClothing)}
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