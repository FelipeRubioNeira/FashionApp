import IOutfitRepository from "app/data/interfaces/IOutfitRepository";
import { DI_TOKENS } from "@/di/Container";
import { inject, injectable } from "tsyringe";
import { EditOutfitInformation, ResponseUseCase } from "../Types";
import ReduxDispatcher from "app/store/ReduxDispatcher";
import {updateOutfit} from 'app/store/OutfitsSlice'

/**
 * Use case for editing an outfit.
 * 
 * @remarks
 * This class is part of the domain layer and is responsible for handling the business logic
 * related to editing an outfit.
 * 
 * @param outfitRepository - The repository instance for managing outfit data.
 * 
 * @method execute
 * Executes the use case to edit an outfit.
 * 
 * @param outfitInformation - The information required to edit an outfit.
 * @returns A promise that resolves when the outfit has been successfully edited.
 * 
 * @see {@link IOutfitRepository}
 * @see {@link EditOutfitInformation}
 */
@injectable()
class EditOutfitUseCase {
    constructor(
        @inject(DI_TOKENS.IOutfitSqliteRepositoryToken)
        private outfitRepository: IOutfitRepository,
        private dispatcher: ReduxDispatcher
    ) { }

    /**
     * Executes the use case to edit an outfit.
     * 
     * @param outfitInformation - The information required to edit an outfit.
     * @returns A promise that resolves when the outfit has been successfully edited.
     * 
     * @see {@link EditOutfitInformation}
     */
    async execute(outfitInformation: EditOutfitInformation): Promise<ResponseUseCase> {

        const responseUseCase: ResponseUseCase = {
            success: false,
            message: "No se ha podido actualizar el outfit",
        }

        try {

            const responseDB = await this.outfitRepository.update(outfitInformation)
            if (!responseDB) return responseUseCase

            this.dispatcher.dispatch(updateOutfit(responseDB))

            responseUseCase.success = true
            responseUseCase.message = "Se ha actualizado correctamente el outfit"
            return responseUseCase


        } catch (error) {
            console.log("Error en EditOutfitUseCase", error);
            return responseUseCase

        }
    }


}

export default EditOutfitUseCase