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
import { AddClothingUseCase, EditClothingUseCase, DeleteClothingUseCase } from "@/domain/useCases"
import StyleSelector from 'app/ui/components/StyleSelector'
import Colors from 'app/ui/constants/colors'
import { Translation, TranslationKeys } from '@/ui/i18n'
import ModalCmp from '@/ui/components/modal/ModalCmp'
import globalStyles from '@/ui/constants/globalStyles/globalStyles'
import { FONT_FAMILY, FONT_SIZE } from '@/ui/constants/fonts'
import SeparatorCmp from '@/ui/components/SeparatorCmp'

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
        onPressDeleteClothing,
        modal,



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
                <LabelCmp
                    labelValue={translation.translate(TranslationKeys.addClothingTitle)}
                    style={globalStyles.TITLE}
                />

                <SeparatorCmp style={{ marginVertical: "6%" }} />


                <LabelCmp
                    labelValue={translation.translate(TranslationKeys.clothingImage)}
                    style={localStyles.subTitle}
                />

                {/* ----------------- imagen ----------------- */}
                <View style={localStyles.imageContainer}>

                    {viewMode === 'preview' && newClothing.uri && <Image
                        source={{ uri: newClothing.uri }}
                        style={localStyles.image}
                        resizeMode="contain"
                    />}

                    {viewMode === 'camera' && <CamaraViewCmp onTakePicture={takePicture} />}

                </View>


                {/* ----------------- botones para galeria y camara ----------------- */}
                <View style={localStyles.buttonContainer}>
                    <ButtonCmp
                        text={translation.translate(TranslationKeys.openGallery)}
                        onPress={openGallery}
                        textStyle={{ color: Colors.SAND }}
                        style={localStyles.multimediaButtons}
                    />

                    <SpacerCmp marginHorizontal={"2%"} />

                    <ButtonCmp
                        onPress={openCamera}
                        text={translation.translate(TranslationKeys.openCamera)}
                        textStyle={{ color: Colors.SAND }}
                        style={localStyles.multimediaButtons}
                    />
                </View>


                <SeparatorCmp style={{ marginVertical: "6%" }} />



                {/* ----------------- nombre de la prenda ----------------- */}


                <LabelCmp
                    labelValue={translation.translate(TranslationKeys.ClothingName)}
                    style={localStyles.subTitle}
                />
                <TextInputCmp
                    placeholder={`${translation.translate(TranslationKeys.clothingNamePlaceholder)} ...`}
                    value={newClothing.name}
                    onChangeText={updateClothingName}
                />


                <SeparatorCmp style={{ marginVertical: "6%" }} />


                <LabelCmp
                    labelValue={translation.translate(TranslationKeys.ClothingType)}
                    style={localStyles.subTitle}
                />
                <SpacerCmp marginVertical={"1%"} />
                <ClothingCategoryCmp
                    categoryList={categoryList}
                    selectedValue={newClothing.type}
                    onChangeCategory={onChangeCategory}
                />

                <SeparatorCmp style={{ marginVertical: "6%" }} />


                <LabelCmp
                    labelValue={translation.translate(TranslationKeys.ClothingStyle)}
                    style={localStyles.subTitle}
                />
                <SpacerCmp marginVertical={"1%"} />
                <StyleSelector
                    styleList={ClothingStylesList}
                    styleSelected={newClothing.style}
                    onPress={updateClothingStyle}
                />


                <SeparatorCmp style={{ marginVertical: "8%" }} />



                {/* ----------------- boton para guardar ----------------- */}

                <View style={localStyles.footer}>

                    <ButtonCmp
                        style={localStyles.deleteButton}
                        text={translation.translate(TranslationKeys.deleteButton)}
                        onPress={onPressDeleteClothing}
                        textStyle={{ color: Colors.WHITE }}
                    />

                    <SpacerCmp marginHorizontal={8} />

                    <ButtonCmp
                        style={localStyles.saveButton}
                        text={translation.translate(TranslationKeys.saveButton)}
                        textStyle={{ color: Colors.WHITE }}
                        onPress={() => saveClothing(newClothing)}
                    />

                </View>

                <SpacerCmp marginVertical={"4%"} />


            </ScreenCmp>

            <ModalCmp {...modal.config}>
            </ModalCmp>
        </>


    )
}



// --------------- styles --------------- //
const localStyles = StyleSheet.create({

    subTitle: {
        fontFamily: FONT_FAMILY.PLAYFAIR_REGULAR,
        fontSize: FONT_SIZE.MEDIUM
    },
    imageContainer: {
        width: "100%",
        height: 300,
        marginVertical: "4%",
        borderRadius: 10,
        borderWidth: .2,
        borderColor: Colors.GRAY,
        backgroundColor: Colors.SAND,
        ...globalStyles.SHADOW
    },
    image: {
        width: "100%",
        height: "100%",
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    saveButton: {
        marginVertical: 10,
        flex: 1,
        backgroundColor: Colors.BLACK
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
    },
    multimediaButtons: {
        flex: 1,
        backgroundColor: Colors.BLACK
    }

})



export default AddClothingScreen