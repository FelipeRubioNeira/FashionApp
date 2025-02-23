type ClothingType = "top" | "bottom" | "shoes"

type ClothingItemType = {
    id: number,
    uri: string,
    type?: ClothingType
}

type TopClothingType = ClothingItemType


type BottomClothingType = ClothingItemType

type ShoesType = ClothingItemType

export type {
    ClothingItemType,
    TopClothingType,
    BottomClothingType,
    ShoesType,
    ClothingType
}

