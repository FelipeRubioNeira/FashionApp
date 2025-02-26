import { ClothingStyle, ClothingType } from "@/app/domain/Types"

type ClothingTbType = {
    clo_id: number,
    clo_uri: string,
    clo_name: string,
    clo_type: ClothingType,
    clo_style: ClothingStyle,
}

export type {
    ClothingTbType
}

