import IOutfitRepository from "@/data/interfaces/IOutfitRepository";
import { DI_TOKENS } from "@/di/Container";
import { inject } from "tsyringe";

class EditOutfitUseCase {
    constructor(
        @inject(DI_TOKENS.IOutfitSqliteRepositoryToken)
        private outfitRepository: IOutfitRepository
    ) { }

    async execute(): Promise<void> {

    }

}

export default EditOutfitUseCase