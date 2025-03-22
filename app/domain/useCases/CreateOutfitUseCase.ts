import IOutfitRepository from "app/data/interfaces/IOutfitRepository";
import { DI_TOKENS } from "@/di/Container";
import { inject, injectable } from "tsyringe";
import { Outfit, ResponseUseCase } from "../types/Types";

@injectable()
class CreateOutfitUseCase {
    constructor(
        @inject(DI_TOKENS.IOutfitSqliteRepositoryToken) private outfitSqliteRepository: IOutfitRepository
    ) { }

    async execute(newOutfit: Outfit): Promise<ResponseUseCase> {

        const failedUseCase: ResponseUseCase = {
            success: false,
            message: "No se ha podido crear el outfit"
        }

        try {

            if (
                newOutfit.topClothing.id === 0
                && newOutfit.bottomClothing.id === 0
                && newOutfit.shoes.id === 0

            ) return failedUseCase


            const response = await this.outfitSqliteRepository.save(newOutfit)
            if (!response) return failedUseCase


            console.log("Se ha guardado exitosamente el outfit");

            return {
                success: true,
                message: "Existo al crear el outfit"
            }

        } catch (error) {
            console.log("Ha ocurrido un error al ejecutar CreateOutfitUseCase", error);
            return failedUseCase
        }

    }

}

export default CreateOutfitUseCase