import { Clothing, ClothingType } from "@/app/domain/Types";


interface ScreenMainMenuParams {
    clothingType: ClothingType,
    imageUri: number,
    [key: string]: any;
}

interface ScreenAddClothingParams extends Clothing {
    [key: string]: any;
}

export type {
    ScreenMainMenuParams,
    ScreenAddClothingParams
}