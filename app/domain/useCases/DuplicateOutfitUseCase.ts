import IOutfitRepository from "@/data/interfaces/IOutfitRepository";
import { DI_TOKENS } from "@/di/Container";
import { inject, injectable } from "tsyringe";
import { Outfit, ResponseUseCase } from "../Types";
import ReduxDispatcher from "@/store/ReduxDispatcher";
import { addOutfit } from "@/store/OutfitsSlice";

@injectable()
class DuplicateOutfitUseCase {
    constructor(
        @inject(DI_TOKENS.IOutfitSqliteRepositoryToken)
        private outfitSQLRepository: IOutfitRepository,
        private dispatcher: ReduxDispatcher
    ) { }

    /**
     * 
     * @param outfitId - id del outfit a duplicar
     */
    execute = async (outfitId: number): Promise<ResponseUseCase<Outfit>> => {

        // si no se puede duplicar el outfit, entonces se retorna un mensaje de error
        const responseUseCase: ResponseUseCase<Outfit> = {
            success: false,
            message: "No se ha podido duplicar el outfit",
            data: undefined
        }


        try {

            // 1- se busca el outfit en la base de datos
            const outfitFromDB = await this.outfitSQLRepository.getById(outfitId)
            if (!outfitFromDB) return responseUseCase

            // 2- Se crea un nuevo outfit con los mismos datos que el outfit original
            const { name, topClothing, bottomClothing, shoes } = outfitFromDB
            const newOutfit: Outfit = {
                id: 0, // ID will be auto-incremented by the database
                name: name + " (copia)",
                topClothing,
                bottomClothing,
                shoes,
            }

            // 3- Se guarda el nuevo outfit en la base de datos
            const dbResponse = await this.outfitSQLRepository.save(newOutfit)
            if (!dbResponse) return responseUseCase

            // 4- Se retorna el nuevo outfit
            responseUseCase.success = true
            responseUseCase.message = "Outfit duplicado correctamente"
            responseUseCase.data = dbResponse
            

            // 5- Se actualiza el store de Redux
            this.dispatcher.dispatch(addOutfit(dbResponse))

            // 6- Se retorna el nuevo outfit
            return responseUseCase

        } catch (error) {
            console.error("Error duplicating outfit:", error);
            return responseUseCase;
        }
    }

}

export default DuplicateOutfitUseCase;