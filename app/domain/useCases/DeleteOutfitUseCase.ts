import IOutfitRepository from "app/data/interfaces/IOutfitRepository";
import { DI_TOKENS } from "@/di/Container";
import { inject, injectable } from "tsyringe";
import { ResponseUseCase } from "../Types";

@injectable()
class DeleteOutfitUseCase {
    constructor(
        @inject(DI_TOKENS.IOutfitSqliteRepositoryToken)
        private outfitRepository: IOutfitRepository
    ) { }

    async execute(outfitId: number): Promise<ResponseUseCase> {

        const failedUseCase: ResponseUseCase = {
            success: false,
            message: "Error al eliminar el outfit"
        }

        try {

            const response = await this.outfitRepository.delete(outfitId)

            if (!response) return failedUseCase

            return {
                success: true,
                message: "Outfit eliminado correctamente"
            }

        } catch (error) {
            console.log("Excepcion en DeleteOutfitUseCase ", error);
            return failedUseCase

        }

    }

}

export default DeleteOutfitUseCase