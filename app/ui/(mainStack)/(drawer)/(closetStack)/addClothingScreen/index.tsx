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
import { Clothing } from '@/domain/types/Types'
import { AddClothingUseCase, EditClothingUseCase, DeleteClothingUseCase } from "@/domain/useCases"
import StyleSelector from 'app/ui/components/StyleSelector'
import Colors from 'app/ui/constants/colors'
import { Translation, TranslationKeys } from '@/ui/i18n'
import ModalCmp from '@/ui/components/modal/ModalCmp'


const addClothingUseCase = container.resolve(AddClothingUseCase)
const editClothingUseCase = container.resolve(EditClothingUseCase)
const deleteClothingUseCase = container.resolve(DeleteClothingUseCase)
const translation = container.resolve(Translation);


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
        saveClothing,
        takePicture,
        updateClothingName,
        onChangeCategory,
        updateClothingStyle,
        deleteImage,

        modalTitle,
        modalVisible,
        hideModal,
        modalButtonList,
        modalMessage


    } = useAddClouthingViewModel(
        addClothingUseCase,
        editClothingUseCase,
        deleteClothingUseCase
    );





    // --------------- render --------------- //
    return (
        <>

            <ScreenCmp scrollable={true}>


                {/* ----------------- titulo ----------------- */}
                <LabelCmp labelValue={translation.translate(TranslationKeys.addClothingTitle)} />



                {/* ----------------- botones para galeria y camara ----------------- */}
                <View style={localStyles.buttonContainer}>
                    <ButtonCmp
                        text={translation.translate(TranslationKeys.openGallery)}
                        onPress={openGallery}
                        style={{ marginRight: 5, flex: 1 }}
                    />

                    <ButtonCmp
                        text={translation.translate(TranslationKeys.openCamera)}
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

                <SpacerCmp marginVertical={"2%"} />


                <LabelCmp labelValue={translation.translate(TranslationKeys.ClothingName)} />
                <TextInputCmp
                    placeholder={translation.translate(TranslationKeys.clothingNamePlaceholder)}
                    value={newClothing.name}
                    onChangeText={updateClothingName}
                />


                <SpacerCmp marginVertical={"2%"} />


                <LabelCmp labelValue={translation.translate(TranslationKeys.ClothingType)} />
                <SpacerCmp marginVertical={"2%"} />
                <ClothingCategoryCmp
                    categoryList={categoryList}
                    selectedValue={newClothing.type}
                    onChangeCategory={onChangeCategory}
                />


                <SpacerCmp marginVertical={"4%"} />


                <LabelCmp labelValue={translation.translate(TranslationKeys.ClothingStyle)} />
                <SpacerCmp marginVertical={"2%"} />
                <StyleSelector
                    styleList={ClothingStylesList}
                    styleSelected={newClothing.style}
                    onPress={updateClothingStyle}
                />


                <SpacerCmp marginVertical={"2%"} />



                {/* ----------------- boton para guardar ----------------- */}

                <View style={localStyles.footer}>

                    <ButtonCmp
                        style={localStyles.deleteButton}
                        text={translation.translate(TranslationKeys.deleteButton)}
                        onPress={() => deleteImage(newClothing as Clothing)}
                    />

                    <SpacerCmp marginHorizontal={8} />

                    <ButtonCmp
                        style={localStyles.saveButton}
                        text={translation.translate(TranslationKeys.saveButton)}
                        onPress={() => saveClothing(newClothing)}
                    />

                </View>

                <SpacerCmp marginVertical={"2%"} />



            </ScreenCmp>

            <ModalCmp
                visible={modalVisible}
                title={modalTitle}
                buttonList={modalButtonList}
                hide={hideModal}
                message={modalMessage}
            >
            </ModalCmp>
        </>


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
    },
    footer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between"
    }

})



export default AddClothingScreen