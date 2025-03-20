import IClothingRepository from "app/data/interfaces/IClothingRepository";
import { DI_TOKENS } from "@/di/Container";
import { inject, injectable } from "tsyringe";
import { Clothing } from "../Types";

@injectable()
class GetSingleClothingUseCase {
    constructor(
        @inject(DI_TOKENS.IClothingRepositoryToken) private clothingRepository: IClothingRepository
    ) { }

    async execute(clothingId: number): Promise<Clothing | null> {

        try {
            const response = await this.clothingRepository.getSingleClothing(clothingId)
            return Promise.resolve(null)

        } catch (error) {
            console.log("Error en GetSingleClothingUseCase ", error)
            return null
        }

    }

}

export default GetSingleClothingUseCase
