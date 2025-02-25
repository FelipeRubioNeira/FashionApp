import IClothingRepository from "@/app/data/IClothingRepository";
import { DI_TOKENS } from "@/app/di/Container";
import { inject, injectable } from "tsyringe";
import { Clothing, ResponseUseCase } from "../Types";

@injectable()
class EditClothingUseCase {
    constructor(
        @inject(DI_TOKENS.IClothingRepositoryToken) private clothingRepository: IClothingRepository,
        @inject(DI_TOKENS.IClothingImageRepositoryToken) private imageRepository: IClothingRepository,
    ) { }

    async execute(clothing: Clothing): Promise<ResponseUseCase> {

        const errorMessage = this.generateErrorMessage();

        try {

            // 1. Editamos la prenda desde la DB
            const result = await this.clothingRepository.editClothing(clothing)
            if (!result) return errorMessage


            // 2.1 Eliminamos la imagen anterior
            const deleteOk = await this.imageRepository.deleteClothing(clothing)
            if (!deleteOk) return errorMessage


            // 2.2 agregamos la imagen
            const saveOk = await this.imageRepository.saveClothing(clothing)
            if (!saveOk) return errorMessage


            return this.generateSuccessMessage()

        } catch (error) {
            console.log("Ha ocurrido un error al ejecutar EditClothingUseCase ", error);

            return this.generateErrorMessage()
        }


    }

    private generateErrorMessage(): ResponseUseCase {
        return {
            success: false,
            message: "No se ha podido actualizar la prenda",
        }
    }

    private generateSuccessMessage(): ResponseUseCase {
        return {
            success: true,
            message: "Se ha actualizado la prenda correctamente",
        }
    }

}

export default EditClothingUseCase