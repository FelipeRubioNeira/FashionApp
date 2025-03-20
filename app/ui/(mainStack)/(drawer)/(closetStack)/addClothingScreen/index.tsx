import { container } from 'tsyringe'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import ButtonCmp from 'app/ui/components/ButtonCmp'
import CamaraViewCmp from 'app/ui/components/CamaraViewCmp'
import ScreenCmp from 'app/ui/components/ScreenCmp'
import TextInputCmp from 'app/ui/components/TextInputCmp'
import LabelCmp from 'app/ui/components/LabelCmp'
import useAddClouthingViewModel from './addClothingViewModel'
import ClothingCategoryCmp from 'app/ui/components/ClothingCategoryCmp'
import SpacerCmp from 'app/ui/components/SpacerCmp'
import { Clothing } from '@/domain/Types'
import { AddClothingUseCase, EditClothingUseCase, DeleteClothingUseCase } from "@/domain/useCases"
import StyleSelector from 'app/ui/components/StyleSelector'
import Colors from 'app/ui/constants/colors'


const addClothingUseCase = container.resolve(AddClothingUseCase)
const editClothingUseCase = container.resolve(EditClothingUseCase)
const deleteClothingUseCase = container.resolve(DeleteClothingUseCase)


// --------------- component --------------- //
const AddClothingScreen = () => {


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
        deleteImage,
    } = useAddClouthingViewModel(
        addClothingUseCase,
        editClothingUseCase,
        deleteClothingUseCase
    );





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
                label={'Nombre de prenda'}
                placeholder='Ingrese nombre'
                value={newClothing.name}
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

            <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>

                <ButtonCmp
                    style={localStyles.deleteButton}
                    text="Eliminar"
                    onPress={() => deleteImage(newClothing as Clothing)}
                />

                <SpacerCmp marginHorizontal={8} />

                <ButtonCmp
                    style={localStyles.saveButton}
                    text="Guardar"
                    onPress={() => saveImage(newClothing)}
                />

            </View>


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
        flex: 1
    },
    deleteButton: {
        marginVertical: 10,
        flex: 1,
        backgroundColor: Colors.DANGER
    }

})



export default AddClothingScreen