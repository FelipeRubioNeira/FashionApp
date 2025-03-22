import { TranslationKey } from '../keys';


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

const en: Record<TranslationKey, string> = {
  selectLanguage: "Select language",
  searchChothingPlaceholder: "blue jeans or red t-shirt...",
  addClothingTitle: "Add new clothing",
  addClothing: "Add clothing",
  openCamera: "Open camera",
  openGallery: "Open gallery",
  ClothingName: "Clothing name",
  clothingNamePlaceholder: "add clothing name",
  ClothingType: "Clothing type",
  ClothingStyle: "Clothing style",

  deleteButton: "Delete",
  saveButton: "Save",
  cancelButton: "Cancel",

  saveOutfitTitle: "Save outfit",
  saveOutfitPlaceholder: "Save outfit name",

  ...MenuKeysEn,
  ...ClothingTypeKeysEn,
  ...ClothingStyleKeysEn
};

export default en;