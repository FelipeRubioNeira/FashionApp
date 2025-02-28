import { Clothing, ClothingType } from "@/domain/Types";


interface ScreenMainMenuParams {
    clothingType: ClothingType,
    imageUri: number,
    [key: string]: any;
}

/**
 * Parámetros de navegación para la pantalla de agregar ropa.
 * Extiende las propiedades de la interfaz `Clothing` y permite atributos adicionales dinámicos.
 * @extends {Clothing}
 */
interface ScreenAddClothingParams extends Clothing {
    [key: string]: any;
}

export type {
    ScreenMainMenuParams,
    ScreenAddClothingParams
}