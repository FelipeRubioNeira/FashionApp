import { TranslationKey, ValidationsKey } from '../keys';


/**
 * Traducciones en inglés
 */

const MenuKeysEn = {
  myClosetMenu: "My Closet",
  myOutfitsMenu: "My Outfits",
}

const ClothingTypeKeysEn = {
  top: "Top",
  bottom: "Bottom",
  shoes: "Shoes",
};

const ClothingStyleKeysEn = {
  formal: "Formal",
  semiFormal: "Semi-formal",
  informal: "Informal",
  casual: "Casual",
  sport: "Sport",
  urban: "Urban"
}

const ValidationsKeysEn: { [k in ValidationsKey]: string } = {
  addImageBeforeSave: "Please add an image before saving",
  addNameBeforeSave: "Please add a name before saving",
  selectTypeBeforeSave: "Please select a type before saving",
  selectStyleBeforeSave: "Please select a style before saving",
  okMessage: "Ok",

  onDeleteClothingTitle: "Delete clothing",
  onDeleteClothingMessage: "Are you sure you want to delete this clothing?",

  onDeleteOutfitTitle: "Delete outfit",
  onDeleteOutfitMessage: "Are you sure you want to delete this outfit?",

  saveOutfitTitle: "SAVE OUTFIT",
  saveOutfitMessageMinimum: "An outfit must have at least 3 basic clothing items: top, bottom, and shoes"
}



const en: Record<TranslationKey, string> = {
  selectLanguage: "Select language",
  searchChothingPlaceholder: "blue jeans or red t-shirt...",
  addClothingTitle: "Add new clothing",
  addClothing: "Add clothing",
  openCamera: "Open camera",
  openGallery: "Open gallery",
  clothingImage: "Clothing image",
  ClothingName: "Clothing name",
  clothingNamePlaceholder: "add clothing name",
  ClothingType: "Clothing type",
  ClothingStyle: "Clothing style",

  deleteButton: "Delete",
  saveButton: "Save",
  cancelButton: "Cancel",

  saveOutfitPlaceholder: "Save outfit name",

  ...MenuKeysEn,
  ...ClothingTypeKeysEn,
  ...ClothingStyleKeysEn,
  ...ValidationsKeysEn,

  copy: "Copy",
};

export default en;