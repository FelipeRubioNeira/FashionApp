import { injectable } from "tsyringe";
import { ClothingStyle, ClothingType, EditOutfitInformation, Outfit } from "../domain/types/Types";
import IOutfitRepository from "./interfaces/IOutfitRepository";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import DbConnection from "./db/DbConnection";
import { ClothingTable, ClothingTableType, OutfitTable, OutfitTableType } from "./db/Schema";
import { aliasedTable, eq } from "drizzle-orm";



@injectable()
class OutfitSqliteRepository implements IOutfitRepository {


    // ----------- atributes ----------- //
    private db: ExpoSQLiteDatabase;


    // ----------- constructor ----------- //
    constructor(private dbConnection: DbConnection) {
        this.db = this.dbConnection.db
    }


    // ----------- private methods ----------- //
    private logError(method: string, error: unknown) {
        console.log(`Ha ocurrido un error en ${this.constructor.name}, ${method}, ${error}`)
    }

    private mapOutfitTableTypeToOutfit = (dbResult: {
        outfit: OutfitTableType,
        topClothing: ClothingTableType | null,
        bottomClothing: ClothingTableType | null,
        shoes: ClothingTableType | null
    }[]): Outfit[] => {

        return dbResult.map(({ outfit, topClothing, bottomClothing, shoes }) => {


            const newOutfit: Outfit = {

                id: outfit.out_id,
                name: outfit.out_name,

                topClothing: {
                    id: topClothing?.clo_id || 0,
                    name: topClothing?.clo_name || "",
                    style: topClothing?.clo_style as ClothingStyle,
                    type: topClothing?.clo_type as ClothingType,
                    uri: topClothing?.clo_uri || ""
                },

                bottomClothing: {
                    id: bottomClothing?.clo_id || 0,
                    name: bottomClothing?.clo_name || "",
                    style: bottomClothing?.clo_style as ClothingStyle,
                    type: bottomClothing?.clo_type as ClothingType,
                    uri: bottomClothing?.clo_uri || ""
                },

                shoes: {
                    id: shoes?.clo_id || 0,
                    name: shoes?.clo_name || "",
                    style: shoes?.clo_style as ClothingStyle,
                    type: shoes?.clo_type as ClothingType,
                    uri: shoes?.clo_uri || ""
                }

            }

            return newOutfit

        })



    }


    // ----------- public methods ----------- //


    async getById(outfitId: number): Promise<Outfit | null> {

        try {

            const topClothingTable = aliasedTable(ClothingTable, "topClothing")
            const bottomClothingTable = aliasedTable(ClothingTable, "bottomClothing")
            const shoesTable = aliasedTable(ClothingTable, "shoes")

            const dbResult = await this.db
                .select({
                    outfit: OutfitTable,
                    topClothing: topClothingTable,
                    bottomClothing: bottomClothingTable,
                    shoes: shoesTable
                }).from(OutfitTable)
                .leftJoin(topClothingTable, eq(OutfitTable.out_top_id, topClothingTable.clo_id))
                .leftJoin(bottomClothingTable, eq(OutfitTable.out_btn_id, bottomClothingTable.clo_id))
                .leftJoin(shoesTable, eq(OutfitTable.out_sho_id, shoesTable.clo_id))
                .where(eq(OutfitTable.out_id, outfitId))

            if (dbResult.length === 0) return null

            const outfitsList = this.mapOutfitTableTypeToOutfit(dbResult)

            return outfitsList[0]

        } catch (error) {
            this.logError("getById()", error)
            return null
        }

    }

    async save({ name, topClothing, bottomClothing, shoes }: Outfit): Promise<Outfit | null> {

        try {

            const response = await this.db.insert(OutfitTable)
                .values({
                    out_name: name,
                    out_top_id: topClothing.id,
                    out_btn_id: bottomClothing.id,
                    out_sho_id: shoes.id
                })

            if (!response.lastInsertRowId) return null;

            // Usar el lastInsertRowId para obtener el outfit insertado
            const savedOutfit = await this.getById(response.lastInsertRowId);
            return savedOutfit;

        } catch (error) {
            this.logError("save()", error)
            return null
        }

    }

    async getAll(): Promise<Outfit[]> {

        try {

            const topClothingTable = aliasedTable(ClothingTable, "topClothing")
            const bottomClothingTable = aliasedTable(ClothingTable, "bottomClothing")
            const shoesTable = aliasedTable(ClothingTable, "shoes")

            const dbResult = await this.db
                .select({
                    outfit: OutfitTable,
                    topClothing: topClothingTable,
                    bottomClothing: bottomClothingTable,
                    shoes: shoesTable
                }).from(OutfitTable)
                .leftJoin(topClothingTable, eq(OutfitTable.out_top_id, topClothingTable.clo_id))
                .leftJoin(bottomClothingTable, eq(OutfitTable.out_btn_id, bottomClothingTable.clo_id))
                .leftJoin(shoesTable, eq(OutfitTable.out_sho_id, shoesTable.clo_id))

            const outfitsList = this.mapOutfitTableTypeToOutfit(dbResult)

            return outfitsList


        } catch (error) {
            this.logError("getAll()", error)
            return []
        }

    }

    async delete(outfitId: number): Promise<boolean> {

        try {

            const resultDB = await this.db
                .delete(OutfitTable)
                .where(eq(OutfitTable.out_id, outfitId))

            return !!resultDB.changes

        } catch (error) {
            this.logError("delete()", error)
            return false

        }

    }

    async update({ outfitId, name, topId, bottomId, shoesId }: EditOutfitInformation): Promise<Outfit | null> {

        try {

            return this.db.transaction(async (tx) => {

                const updateResult = await tx
                    .update(OutfitTable)
                    .set({
                        out_name: name,
                        out_top_id: topId,
                        out_btn_id: bottomId,
                        out_sho_id: shoesId
                    })
                    .where(eq(OutfitTable.out_id, outfitId))

                if (updateResult.changes === 0) {
                    throw new Error("No se pudo actualizar el outfit")
                }

                return this.getById(outfitId)

            })


        } catch (error) {
            this.logError("editOutfit()", error)
            return null
        }

    }



}



export default OutfitSqliteRepository