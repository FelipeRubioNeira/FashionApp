import { CategorizedClothingCollection, Clothing, ClothingStyle, ClothingType } from "../Types";
import { inject, injectable } from 'tsyringe';
import IClothingRepository from "@/app/data/interfaces/IClothingRepository";
import { DI_TOKENS } from "@/app/di/Container";
import { ClothingTableType } from "@/app/data/db/Schema";


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