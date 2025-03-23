/**
 * Definición de todas las claves de traducción disponibles
 * Esto permite autocompletado y type checking
 */

export const MenuKeys = {
    myClosetMenu: "myClosetMenu",
    myOutfitsMenu: "myOutfitsMenu",
} as const

export const ClothingTypeKeys = {
    top: "top",
    bottom: "bottom",
    shoes: "shoes",
 } as const;

 export const ClothingStyleKeys = {
    formal: "formal",
    semiFormal: "semiFormal",
    informal: "informal",
    casual: "casual",
    sport: "sport",
    urban: "urban"
 } as const;


 export const ValidationsKeys = {
    addImageBeforeSave: "addImageBeforeSave",
    addNameBeforeSave: "addNameBeforeSave",
    selectTypeBeforeSave: "selectTypeBeforeSave",
    selectStyleBeforeSave: "selectStyleBeforeSave",
    okMessage: "okMessage",

    onDeleteClothingTitle:"onDeleteClothingTitle",
    onDeleteClothingMessage:"onDeleteClothingMessage",

    onDeleteOutfitTitle:"onDeleteOutfitTitle",
    onDeleteOutfitMessage:"onDeleteOutfitMessage",

    saveOutfitTitle: "saveOutfitTitle",
    saveOutfitMessageMinimum: "saveOutfitMessageMinimum",

 } as const





export const TranslationKeys = {

    // select languajeScreen
    selectLanguage: "selectLanguage",

    // my closet screen
    searchChothingPlaceholder: "searchChothingPlaceholder",
    addClothing: "addClothing",

    // add clothing screen
    addClothingTitle: "addClothingTitle",
    openCamera: "openCamera",
    openGallery: "openGallery",
    ClothingName: "ClothingName",
    clothingNamePlaceholder: "clothingNamePlaceholder",
    ClothingType: "ClothingType",

    ClothingStyle: "ClothingStyle",

    deleteButton: "deleteButton",
    saveButton: "saveButton",
    cancelButton: "cancelButton",

    ...ClothingTypeKeys,
    ...ClothingStyleKeys,
    ...MenuKeys,
    ...ValidationsKeys,

    saveOutfitTitle: "saveOutfitTitle",
    saveOutfitPlaceholder: "saveOutfitPlaceholder",

    copy: "copy",


    // Add more keys as needed
} as const;

/**
 * Tipo que representa todas las claves de traducción posibles
 */
export type TranslationKey = keyof typeof TranslationKeys;
export type ValidationsKey = keyof typeof ValidationsKeys;


