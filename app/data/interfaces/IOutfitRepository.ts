import { EditOutfitInformation, Outfit } from "@/domain/Types"

interface IOutfitRepository {


    /**
     * getById
     * @param outfitId - id del outfit a buscar
     * @returns outfit encontrado
     */
    getById(outfitId: number): Promise<Outfit | null>

    /**
     * save
     * @param outfit - tipo de dato que contiene un nombre y 3 posibles prendas
     */
    save(newOutfit: Partial<Outfit>): Promise<Outfit | null>

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



    /**
     * 
     * {@link EditOutfitInformation} - tipo de dato que contiene la información necesaria para editar un outfit
     * @returns outfit actualizado
     */
    update(outfitInformation: EditOutfitInformation): Promise<Outfit | null>

}

export default IOutfitRepository