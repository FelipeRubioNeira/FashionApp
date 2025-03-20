import { DI_TOKENS } from "@/di/Container";
import { inject, injectable } from "tsyringe";
import { Outfit } from "../Types";
import IOutfitRepository from "app/data/interfaces/IOutfitRepository";
import ReduxDispatcher from "app/store/ReduxDispatcher";
import { initializeOutfits } from "app/store/OutfitsSlice";


@injectable()
class GetOutfitsUseCase {
    constructor(
        @inject(DI_TOKENS.IOutfitSqliteRepositoryToken)
        private outfitRepository: IOutfitRepository,
        private dispatcher: ReduxDispatcher
    ) { }

    async execute(): Promise<Outfit[]> {

        try {
            const response = await this.outfitRepository.getAll()
            this.dispatcher.dispatch(initializeOutfits(response))

            console.log("Se ha ejecutado el use case de GetOutfits correctamente: Se han traido", response.length, "items");
            
            return response

        } catch (error) {
            console.log("Error en GetOutfitsUseCase", error);
            return []
        }

    }


}

export default GetOutfitsUseCase