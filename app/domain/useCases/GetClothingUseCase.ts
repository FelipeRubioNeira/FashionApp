import { ClothingType } from "../Types";
import { inject, injectable } from 'tsyringe';
import IClothingRepository from "@/app/data/IClothingRepository";
import { DI_TOKENS } from "@/app/di/Container";



// TODO: Cambiar a IClothingRepository e inyectar la dependencia

@injectable()
class GetClothingUseCase {
    constructor(
        @inject(DI_TOKENS.IClothingRepositoryToken) private clothingRepository: IClothingRepository
    ) { }

    execute(clothingType?: ClothingType) {

        if (!clothingType) {
            return this.clothingRepository.getClothingList();
        }
        return this.clothingRepository.getClothingList(clothingType);

    }

}

export default GetClothingUseCase