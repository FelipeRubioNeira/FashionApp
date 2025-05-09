import { ClothingTypeKeys, ClothingStyleKeys } from '@/ui/i18n/keys';


/**
 * ClothingType
 */
const ClothingTypeList = [
    ...Object.values(ClothingTypeKeys),
    ""
] as const
type ClothingType = typeof ClothingTypeList[number]


/**
 * ClothingStyle
 * 
 */
const ClothingStylesList = [
    ...Object.values(ClothingStyleKeys),
    ""
] as const;
type ClothingStyle = typeof ClothingStylesList[number];

/**
 * Clothing
 * 
 * Unidad basica de prendas en la aplicacion
 */
type Clothing = {
    id: number,
    uri: string,
    name: string,
    type: ClothingType,
    style: ClothingStyle,
}

/**
 * Outfit
 * 
 * Conjunto de 1 - 3 prendas que permiten generar un outfit/conjunto. Ademas existe un nombre para este conjunto de ropa
 */
type Outfit = {
    id: number,
    name: string,
    topClothing: Clothing,
    bottomClothing: Clothing,
    shoes: Clothing,
}

/**
 * EditOutfitInformation
 * 
 * Cuando se desea editar un outfit, estos son los datos basicos que se requieren
 */
type EditOutfitInformation = {
    outfitId: number,
    name: string,
    topId: number,
    bottomId: number,
    shoesId: number
}

/**
 * response use case
 * @T: tipo generico para data
 * @message: si hay mensaje entonces hubo un error
 * @success: true o false dependiendo de si la operacion fue exitosa o no
 * @data: estructura de datos o tipo opcional para ofrecer un tipo de respuesta
 */
type ResponseUseCase<T = unknown> = {
    message: string,
    success: boolean,
    data?: T
}

type CategorizedClothingCollection = {
    topClothing: Clothing[],
    bottomClothing: Clothing[],
    shoes: Clothing[],
}


enum LanguageSelection {
    ENGLISH = "en",
    SPANISH = "es",
}

export {
    Clothing,
    ClothingType,
    ClothingTypeList,
    ResponseUseCase,
    CategorizedClothingCollection,
    ClothingStyle,
    ClothingStylesList,
    Outfit,
    EditOutfitInformation,
    LanguageSelection,
}