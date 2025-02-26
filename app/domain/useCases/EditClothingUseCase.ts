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

    async execute(clothing: Partial<Clothing>): Promise<ResponseUseCase<Clothing>> {

        console.log("nos llega esta prenda para editar ", clothing);


        const errorMessage = this.generateErrorMessage();

        try {


            const createDisk = await this.imageRepository.saveClothing(clothing as Clothing)
            if (!createDisk) return errorMessage

            const createDB = await this.clothingRepository.saveClothing(createDisk)
            if (!createDB) return errorMessage


            const deleteDB = await this.clothingRepository.deleteClothing(clothing as Clothing)
            if (!deleteDB) return errorMessage


            const deleteDisk = await this.imageRepository.deleteClothing(clothing as Clothing)
            if (!deleteDisk) return errorMessage


            return {
                success: true,
                message: "Se ha actualizado la prenda correctamente",
                data: createDB
            }

        } catch (error) {
            console.log("Ha ocurrido un error al ejecutar EditClothingUseCase ", error);

            return this.generateErrorMessage()
        }


    }

    private generateErrorMessage(): ResponseUseCase<Clothing> {
        return {
            success: false,
            message: "No se ha podido actualizar la prenda",
        }
    }


}

export default EditClothingUseCase