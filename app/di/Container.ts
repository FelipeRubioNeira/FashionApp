import ClothingRepository from "../data/ClothingRepository";
import ImageRepository from "../data/ImageRepository";
import { container } from "tsyringe";
import OutfitSqliteRepository from "../data/OutfitSqliteRepository";
//import MockClothingRepository from "../_test/mocks/MockClothingRepository";

// Tokens del DI
const DI_TOKENS = {
    IClothingImageRepositoryToken: "IClothingImageRepository",
    IClothingRepositoryToken: "IClothingRepository",
    IOutfitSqliteRepositoryToken: "IOutfitSqliteRepository"
}

container.register(
    DI_TOKENS.IClothingImageRepositoryToken,
    { useClass: ImageRepository }
);

container.register(
    DI_TOKENS.IClothingRepositoryToken,
    { useClass: ClothingRepository }
);

container.register(
    DI_TOKENS.IOutfitSqliteRepositoryToken,
    { useClass: OutfitSqliteRepository }
)

// Registrar el mock en el contenedor de inyección de dependencias
// container.register(
//     DI_TOKENS.IClothingRepositoryToken,
//     { useClass: MockClothingRepository }
// );




export { DI_TOKENS };