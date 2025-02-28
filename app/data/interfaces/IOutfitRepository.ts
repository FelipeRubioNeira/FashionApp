import { Outfit } from "@/domain/Types"

interface IOutfitRepository {

    /**
     * save
     * @param outfit - tipo de dato que contiene un nombre y 3 posibles prendas
     */
    save(newOutfit: Partial<Outfit>): Promise<boolean>

}

export default IOutfitRepository