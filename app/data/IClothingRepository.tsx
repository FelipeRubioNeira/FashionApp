import { Clothing, ClothingType } from "../domain/Types";

interface IClothingRepository {

    getClothingList(type: ClothingType): Promise<Clothing[]>

    saveClothing(clothing: Clothing): Promise<Clothing|null>

}

export default IClothingRepository