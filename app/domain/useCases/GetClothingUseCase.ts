import { CategorizedClothingCollection, Clothing, ClothingType } from "../Types";
import { inject, injectable } from 'tsyringe';
import IClothingRepository from "@/data/interfaces/IClothingRepository";
import { DI_TOKENS } from "@/di/Container";


@injectable()
class GetClothingUseCase {
    constructor(@inject(DI_TOKENS.IClothingRepositoryToken) private clothingRepository: IClothingRepository) { }

    async execute(clothingType?: ClothingType): Promise<CategorizedClothingCollection> {

        const dbData = clothingType ? await this.clothingRepository.getClothingList(clothingType)
            : await this.clothingRepository.getClothingList()

        const formattedData = this.categorizeData(dbData)

        return formattedData

    }

    private categorizeData(data: Clothing[]): CategorizedClothingCollection {

        const categorizedData: CategorizedClothingCollection = {
            topClothing: [],
            bottomClothing: [],
            shoes: []
        }

        data.forEach((item) => {

            switch (item.type) {
                case "Superior":
                    categorizedData.topClothing.push(item)
                    break;
                case "Inferior":
                    categorizedData.bottomClothing.push(item)
                    break;
                case "Zapatos":
                    categorizedData.shoes.push(item)
                    break;
            }
        })

        return categorizedData

    }


}

export default GetClothingUseCase