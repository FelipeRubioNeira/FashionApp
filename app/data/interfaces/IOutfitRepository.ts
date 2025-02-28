import { Outfit } from "@/domain/Types"

interface IOutfitRepository {

    /**
     * save
     * @param outfit - tipo de dato que contiene un nombre y 3 posibles prendas
     */
    save(newOutfit: Partial<Outfit>): Promise<boolean>

    /**
     * getAll
     * @returns retorna un array de outfits
     */
    getAll(): Promise<Outfit[]>

    /**
     * delete
     * @param outfitId - id del outfit a eliminar
     */
    delete(outfitId: number): Promise<boolean>

}

export default IOutfitRepository