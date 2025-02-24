import { Clothing } from "../Types";
import { inject, injectable } from "tsyringe";
import IClothingRepository from "@/app/data/IClothingRepository";
import { DI_TOKENS } from "@/app/di/Container";

@injectable()
class AddClothingUseCase {
    constructor(
        @inject(DI_TOKENS.IClothingRepositoryToken) private clothingRepository: IClothingRepository
    ) { }

    async execute(clothing: Clothing) {

        const result = await this.clothingRepository.saveClothing(clothing);

        console.log("result AddClothingUseCase", result);

        return result

    }

}

export default AddClothingUseCase;