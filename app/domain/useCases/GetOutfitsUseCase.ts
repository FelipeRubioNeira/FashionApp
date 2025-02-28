import { DI_TOKENS } from "@/di/Container";
import { inject, injectable } from "tsyringe";
import { Outfit } from "../Types";
import IOutfitRepository from "@/data/interfaces/IOutfitRepository";


@injectable()
class GetOutfitsUseCase {
    constructor(
        @inject(DI_TOKENS.IOutfitSqliteRepositoryToken)
        private outfitRepository: IOutfitRepository
    ) { }

    async execute(): Promise<Outfit[]> {
        return this.outfitRepository.getAll()
    }


}

export default GetOutfitsUseCase