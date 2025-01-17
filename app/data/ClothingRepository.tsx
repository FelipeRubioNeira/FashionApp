import { ClothingType, Clothing } from "../domain/Types";
import IClothingRepository from "./IClothingRepository";

class ClothingRepository implements IClothingRepository {

    private _numeroPrivado: number;

    constructor(numeroPrivado: number) {
        this._numeroPrivado = numeroPrivado;
    }


    async getClothingList(type: ClothingType): Promise<Clothing[]> {
        try {
            return [];

        } catch (error) {
            console.log("Error getting");
            return [];
        }
    }
    saveClothing(clothing: Clothing): Promise<Clothing | null> {
        try {
            return Promise.resolve(clothing);

        } catch (error) {
            console.log("Error saving");
            return Promise.reject(null)
        }
    }


}

export default ClothingRepository