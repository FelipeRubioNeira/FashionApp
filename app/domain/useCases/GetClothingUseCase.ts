import { CategorizedClothingCollection, Clothing, ClothingType } from "../Types";
import { inject, injectable } from 'tsyringe';
import IClothingRepository from "@/data/interfaces/IClothingRepository";
import { DI_TOKENS } from "@/di/Container";
import ReduxDispatcher from "@/store/ReduxDispatcher";
import { initialiceItems } from "@/store/ClosetSlice";

@injectable()
class GetClothingUseCase {
    constructor(
        @inject(DI_TOKENS.IClothingRepositoryToken)
        private clothingRepository: IClothingRepository,
        private dispatcher: ReduxDispatcher
    ) { }

    async execute(clothingType?: ClothingType): Promise<CategorizedClothingCollection> {


        const data: CategorizedClothingCollection = {
            topClothing: [],
            bottomClothing: [],
            shoes: []
        }

        const dbData = clothingType ? await this.clothingRepository.getClothingList(clothingType)
            : await this.clothingRepository.getClothingList()


        if (dbData.length === 0) return data

        const categorizeData = this.categorizeData(dbData)

        this.updateStore(categorizeData)

        return categorizeData

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

    private updateStore = (data: CategorizedClothingCollection) => {
        this.dispatcher.dispatch(initialiceItems(data))
    }


}

export default GetClothingUseCase