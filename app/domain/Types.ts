
const ClothingTypeList = [
    "Superior",
    "Inferior",
    "Zapatos",
    ""
] as const

type ClothingType = typeof ClothingTypeList[number]

const ClothingStylesList = [
    "Formal",
    "Semi formal",
    "Informal",
    "Casual",
    "Sport",
    "Urbano",
    ""
] as const;

type ClothingStyle = typeof ClothingStylesList[number];

type Clothing = {
    id: number,
    uri: string,
    name: string,
    type: ClothingType,
    style: ClothingStyle,
}

/**
 * response use case
 * @T: tipo generico para data
 * @message: si hay mensaje entonces hubo un error
 * @success: true o false dependiendo de si la operacion fue exitosa o no
 * @data: estructura de datos o tipo opcional para ofrecer una respuesta
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

export {
    Clothing,
    ClothingType,
    ClothingTypeList,
    ResponseUseCase,
    CategorizedClothingCollection,
    ClothingStyle,
    ClothingStylesList
}