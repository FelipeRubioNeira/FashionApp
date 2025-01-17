
// En este caso se define el tipo de ropa

type ClothingType =  "TOP" | "BOTTOM" | "SHOES"

type Clothing = {
    uri:string,
    name:string,
    type: ClothingType,
}

export {
    ClothingType,
    Clothing,
}