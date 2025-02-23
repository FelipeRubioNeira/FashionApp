import "reflect-metadata"; // Necesario para tsyringe
import { container } from "tsyringe";
import ClothingRepository from "../data/ClothingRepository";

// Token del DI
const IClothingRepositoryToken:string = "IClothingRepository";

const DI_TOKENS = {
    IClothingRepositoryToken
}

// Registrar el repositorio
container.register(
    IClothingRepositoryToken,
    { useClass: ClothingRepository }
);



export { DI_TOKENS };