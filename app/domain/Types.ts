
// En este caso se define el tipo de ropa

type ClothingType =  "TOP" | "BOTTOM" | "SHOES" | ""
type ClothingStyle = "CASUAL" | "FORMAL" | "SPORTS" | ""

type Clothing = {
    uri:string,
    name:string,
    type: ClothingType,
    style: ClothingStyle,
}

export {
    Clothing,
    ClothingType,
    ClothingStyle
}