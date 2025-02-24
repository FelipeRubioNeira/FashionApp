
// En este caso se define el tipo de ropa

type ClothingType = "TOP" | "BOTTOM" | "SHOES" | ""

type Clothing = {
    id: number,
    uri: string,
    name: string,
    type: ClothingType,
    style: string,
}

/**
 * response use case
 * @message: si hay mensaje entonces hubo un error
 * @success: true o false dependiendo de si la operacion fue exitosa o no
 */
type ResponseUseCase = {
    message: string,
    success: boolean
}

type CategorizedClothingCollection = {
    topClothing: Clothing[],
    bottomClothing: Clothing[],
    shoes: Clothing[],
}

export {
    Clothing,
    ClothingType,
    ResponseUseCase,
    CategorizedClothingCollection

}