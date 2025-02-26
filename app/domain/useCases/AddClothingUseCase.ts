import { Clothing, ResponseUseCase } from "../Types";
import { inject, injectable } from "tsyringe";
import IClothingRepository from "@/app/data/IClothingRepository";
import { DI_TOKENS } from "@/app/di/Container";

@injectable()
class AddClothingUseCase {
    constructor(
        @inject(DI_TOKENS.IClothingRepositoryToken) private clothingRepository: IClothingRepository,
        @inject(DI_TOKENS.IClothingImageRepositoryToken) private imageRepository: IClothingRepository,
    ) { }

    async execute(newClothing: Partial<Clothing>): Promise<ResponseUseCase<Clothing>> {

        console.log("AddClothingUseCase ", newClothing);


        const defaultErrorMessage = {
            message: "Ha ocurrido un error al guardar la prenda",
            success: false,
        }

        const validationResult = this.applyValidations(newClothing)
        if (!validationResult) return validationResult


        try {

            const diskStorageResult = await this.imageRepository.saveClothing(newClothing as Clothing)
            if (!diskStorageResult) return defaultErrorMessage

            const DBresult = await this.clothingRepository.saveClothing({ ...diskStorageResult } as Clothing);
            if (!DBresult) return defaultErrorMessage


            console.log("Se ha creado correctamente la prenda ", DBresult);

            return {
                success: true,
                message: "Se ha creado la prenda correctamente",
                data: DBresult
            }

        } catch (error) {
            console.log("Excepcion al ejecutar AddClothingUseCase ", error)
            return defaultErrorMessage
        }

    }

    // TODO: Aplicar en un futuro todas las validaciones 
    private applyValidations = ({ name, uri, style, type }: Partial<Clothing>): ResponseUseCase => {


        if (!uri) {
            return {
                success: false,
                message: "Debe agregar una imagen de su prenda antes de guardar"
            }
        } else if (!type) {
            return {
                success: false,
                message: "Debe seleccionar un tipo antes de guardar"
            }
        }

        return {
            success: true,
            message: ""
        }


    }

}

export default AddClothingUseCase;