import ClothingRepository from "../data/ClothingRepository";
import ImageRepository from "../data/ImageRepository";
import { container } from "tsyringe";
import OutfitSqliteRepository from "../data/OutfitSqliteRepository";
import ReduxDispatcher from "@/store/ReduxDispatcher";
import { store } from "@/store/Store";

// Tokens del DI
const DI_TOKENS = {
    Store: "Store",
    IClothingImageRepositoryToken: "IClothingImageRepository",
    IClothingRepositoryToken: "IClothingRepository",
    IOutfitSqliteRepositoryToken: "IOutfitSqliteRepository",
}

// 1- Registramos el store de Redux en TSyringe
container.register(DI_TOKENS.Store, { useValue: store });

// 2- ingleton que despacha el estado global de la app
container.registerSingleton(ReduxDispatcher)


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






export { DI_TOKENS };