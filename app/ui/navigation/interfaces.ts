import { ClothingType } from "@/app/domain/Types";


interface ScreenMainMenuParams {
    clothingType: ClothingType,
    imageUri: number,
    [key: string]: any;
}

export type {
    ScreenMainMenuParams,
}