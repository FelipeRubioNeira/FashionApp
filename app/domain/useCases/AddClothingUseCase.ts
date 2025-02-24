import { Clothing } from "../Types";
import { inject, injectable} from "tsyringe";
import IClothingRepository from "@/app/data/IClothingRepository";
import { DI_TOKENS } from "@/app/di/Container";

@injectable()
class AddClothingUseCase {
    constructor(
        @inject(DI_TOKENS.IClothingRepositoryToken) private clothingRepository: IClothingRepository
    ) { }

    execute(clothingItem: Clothing) {
        return this.clothingRepository.saveClothing(clothingItem);
    }

}

export default AddClothingUseCase;