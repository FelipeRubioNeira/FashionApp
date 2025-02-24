import ClothingRepository from "../data/ClothingRepository";
import ImageRepository from "../data/ImageRepository";
import { container } from "tsyringe";
//import MockClothingRepository from "../_test/mocks/MockClothingRepository";

// Tokens del DI
const DI_TOKENS = {
    IClothingImageRepositoryToken: "IClothingImageRepository",
    IClothingRepositoryToken: "IClothingRepository",
}

container.register(
    DI_TOKENS.IClothingImageRepositoryToken,
    { useClass: ImageRepository }
);

// Registrar el repositorio
container.register(
    DI_TOKENS.IClothingRepositoryToken,
    { useClass: ClothingRepository }
);

// Registrar el mock en el contenedor de inyección de dependencias
// container.register(
//     DI_TOKENS.IClothingRepositoryToken,
//     { useClass: MockClothingRepository }
// );




export { DI_TOKENS };