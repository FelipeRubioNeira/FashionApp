import { Clothing, ClothingType } from "@/domain/Types"


// TODO: Cambiar el retorno de la promesa dado que el actual esta asociado a una implementacion concreta
interface IClothingRepository {
    getClothingList(type?: ClothingType): Promise<Clothing[]>
    saveClothing(clothing: Clothing): Promise<Clothing | null>
    deleteClothing(clothing: Clothing): Promise<boolean>
    editClothing(clothing: Clothing): Promise<Clothing | null>
    getSingleClothing(clothingId: number): Promise<Clothing | null>
}

export default IClothingRepository