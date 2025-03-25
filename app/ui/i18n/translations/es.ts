import { TranslationKey, ValidationsKey } from '../keys';

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

const ValidationsKeysEn: { [k in ValidationsKey]: string } = {
  addImageBeforeSave: "Por favor, agrega una imagen antes de guardar",
  addNameBeforeSave: "Por favor, agrega un nombre antes de guardar",
  selectTypeBeforeSave: "Por favor, selecciona un tipo antes de guardar",
  selectStyleBeforeSave: "Por favor, selecciona un estilo antes de guardar",
  okMessage: "Aceptar",

  onDeleteClothingTitle: "Eliminar prenda",
  onDeleteClothingMessage: "¿Estás seguro de que deseas eliminar esta prenda?",

  onDeleteOutfitTitle: "Eliminar conjunto",
  onDeleteOutfitMessage: "¿Estás seguro de que deseas eliminar este conjunto?",

  saveOutfitTitle: "GUARDAR CONJUNTO",
  saveOutfitMessageMinimum: "Un conjunto debe tener al menos 3 prendas básicas: superior, inferior y calzado"
}



const es: Record<TranslationKey, string> = {
  selectLanguage: "Seleccionar idioma",
  searchChothingPlaceholder: "Pantalones azules o camiseta roja...",
  addClothingTitle: "Agregar nueva prenda",
  addClothing: "Agregar prenda",
  openCamera: "Abrir cámara",
  openGallery: "Abrir galería",
  clothingImage: "Imagen de la prenda",
  ClothingName: "Nombre de la prenda",
  clothingNamePlaceholder: "agrega nombre de la prenda",
  ClothingType: "Tipo de prenda",
  ClothingStyle: "Estilo de la prenda",

  deleteButton: "Eliminar",
  saveButton: "Guardar",
  cancelButton: "Cancelar",

  saveOutfitPlaceholder: "Guardar nombre de la combinación",

  ...MenuKeysEs,
  ...ClothingTypeKeysEs,
  ...ClothingStyleKeysEs,
  ...ValidationsKeysEn,

  copy:"Copia",
};

export default es;