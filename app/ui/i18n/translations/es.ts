import { TranslationKey } from '../keys';

/**
 * Traducciones en español
 */

const MenuKeysEs = {
  myClosetMenu: "Mi Armario",
  myOutfitsMenu: "Mis combinaciones",
}

const ClothingTypeKeysEs = {
  top: "Top",
  bottom: "Bottom",
  shoes: "Shoes",
};

const ClothingStyleKeysEs = {
  formal: "Formal",
  semiFormal: "Semi-formal",
  informal: "Informal",
  casual: "Casual",
  sport: "Deportivo",
  urban: "Urbano"
}


const es: Record<TranslationKey, string> = {
  selectLanguage: "Seleccionar idioma",
  searchChothingPlaceholder: "Pantalones azules o camiseta roja...",
  addClothingTitle: "Agregar nueva prenda",
  addClothing: "Agregar prenda",
  openCamera: "Abrir cámara",
  openGallery: "Abrir galería",
  ClothingName: "Nombre de la prenda",
  clothingNamePlaceholder: "agrega nombre de la prenda",
  ClothingType: "Tipo de prenda",
  ClothingStyle: "Estilo de la prenda",

  deleteButton: "Eliminar",
  saveButton: "Guardar",
  cancelButton: "Cancelar",

  saveOutfitTitle: "Guardar combinación",
  saveOutfitPlaceholder: "Guardar nombre de la combinación",

  ...MenuKeysEs,
  ...ClothingTypeKeysEs,
  ...ClothingStyleKeysEs
};

export default es;