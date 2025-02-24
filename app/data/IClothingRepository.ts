import { Clothing, ClothingType } from "../domain/Types";
import { ClothingTbType } from "./db/TableTypes";

interface IClothingRepository {
    getClothingList(type?: ClothingType): Promise<ClothingTbType[]>
    saveClothing(clothing: Clothing): Promise<Clothing | null>
    deleteClothing(clothing: Clothing): Promise<boolean>
}

export default IClothingRepository