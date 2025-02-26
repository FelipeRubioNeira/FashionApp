import { CategorizedClothingCollection, Clothing, ClothingType } from "../Types";
import { inject, injectable } from 'tsyringe';
import IClothingRepository from "@/app/data/IClothingRepository";
import { DI_TOKENS } from "@/app/di/Container";
import { ClothingTbType } from "@/app/data/db/TableTypes";

@injectable()
class GetClothingUseCase {
    constructor(@inject(DI_TOKENS.IClothingRepositoryToken) private clothingRepository: IClothingRepository) { }

    async execute(clothingType?: ClothingType): Promise<CategorizedClothingCollection> {

        const dbData = clothingType ? await this.clothingRepository.getClothingList(clothingType)
            : await this.clothingRepository.getClothingList()

        const formattedData = this.categorizeData(dbData)

        return formattedData

    }

    private categorizeData(data: ClothingTbType[]): CategorizedClothingCollection {

        const categorizedData: CategorizedClothingCollection = {
            topClothing: [],
            bottomClothing: [],
            shoes: []
        }

        data.forEach((item) => {

            const newClothing: Clothing = {
                id: item.clo_id,
                uri: item.clo_uri,
                name: item.clo_name,
                type: item.clo_type,
                style: item.clo_style
            }

            switch (newClothing.type) {
                case "Superior":
                    categorizedData.topClothing.push(newClothing)
                    break;
                case "Inferior":
                    categorizedData.bottomClothing.push(newClothing)
                    break;
                case "Zapatos":
                    categorizedData.shoes.push(newClothing)
                    break;
            }
        })

        return categorizedData

    }


}

export default GetClothingUseCase