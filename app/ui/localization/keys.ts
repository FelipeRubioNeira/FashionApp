/**
 * Definición de todas las claves de traducción disponibles
 * Esto permite autocompletado y type checking
 */
export const TranslationKeys = {
    addClothing: "addClothing",
    openGallery: "openGallery",
    openCamera: "openCamera",
    // ...
} as const;

/**
 * Tipo que representa todas las claves de traducción posibles
 */
export type TranslationKey = keyof typeof TranslationKeys;
