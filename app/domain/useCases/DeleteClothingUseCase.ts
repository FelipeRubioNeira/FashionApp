import { Clothing, ResponseUseCase } from "../types/Types";
import { inject, injectable } from "tsyringe";
import IClothingRepository from "app/data/interfaces/IClothingRepository";
import { DI_TOKENS } from "@/di/Container";
import ReduxDispatcher from "app/store/ReduxDispatcher";
import { deteleClothing } from 'app/store/ClosetSlice'

@injectable()
class DeleteClothingUseCase {

    /**
     * @param imageRepository imagenes en local storage
     * @param clothingRepository: imagens un DB 
     */
    constructor(
        @inject(DI_TOKENS.IClothingImageRepositoryToken) private imageRepository: IClothingRepository,
        @inject(DI_TOKENS.IClothingRepositoryToken) private clothingRepository: IClothingRepository,
        private dispatcher: ReduxDispatcher
    ) { }

    async execute(clothing: Clothing): Promise<ResponseUseCase> {

        try {

            // 1. Intentar eliminar la imagen del almacenamiento local
            const imageDeleted = await this.imageRepository.deleteClothing(clothing);

            if (!imageDeleted) {
                return {
                    success: false,
                    message: "No se pudo eliminar la imagen del almacenamiento local",
                };
            }

            // 2. Si la imagen se eliminó, eliminar los datos de la ropa en la DB
            const clothingDeleted = await this.clothingRepository.deleteClothing(clothing);
            if (!clothingDeleted) {
                return {
                    success: false,
                    message: "No se pudo eliminar la ropa de la base de datos",
                };
            }


            this.dispatcher.dispatch(deteleClothing({
                clothingId: clothing.id,
                clothingType: clothing.type
            }));

            // 3. Éxito total
            return {
                success: true,
                message: "Ropa eliminada correctamente",
            };

        } catch (error) {

            console.error("Error al eliminar la ropa:", error);

            return {
                success: false,
                message: "Ocurrió una excepción al eliminar la ropa",
            };
        }
    }

}

export default DeleteClothingUseCase;