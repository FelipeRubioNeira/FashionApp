import IClothingRepository from "./interfaces/IClothingRepository";
import { injectable } from "tsyringe";
import { ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';
import { ClothingTable, ClothingTableType } from "./db/Schema";
import { eq } from 'drizzle-orm';
import { ClothingType, Clothing, ClothingStyle } from "../domain/Types";
import DbConnection from "./db/DbConnection";


@injectable()
class ClothingRepository implements IClothingRepository {

    private db: ExpoSQLiteDatabase;

    constructor(private dbConnection: DbConnection) {
        this.db = this.dbConnection.db
    }

    /**
     * mapClothingTableTypeToClothing
     * 
     * @param dbResult - Array con datos del tipo ClothingTableType
     * @returns - Se retorna un listado de Clothing[]
     */
    private mapClothingTableTypeToClothing = (dbResult: ClothingTableType[]): Clothing[] => {

        if (dbResult.length === 0) return []

        return dbResult.map(clohtingDb => {

            const { clo_id, clo_name, clo_style, clo_type, clo_uri } = clohtingDb

            const newClothing: Clothing = {
                id: clo_id,
                name: clo_name,
                style: clo_style as ClothingStyle,
                type: clo_type as ClothingType,
                uri: clo_uri
            }

            return newClothing
        })

    }

    async getClothingList(clothingType?: ClothingType): Promise<Clothing[]> {

        try {

            let resultDb = []

            if (clothingType) {
                resultDb = await this.db
                    .select()
                    .from(ClothingTable)
                    .where(eq(ClothingTable.clo_type, clothingType || ""))

            } else {
                resultDb = await this.db.select().from(ClothingTable)
            }

            return this.mapClothingTableTypeToClothing(resultDb)

        } catch (error) {
            console.log("Error en getClothingList repository ", error);
            return [];
        }
    }

    async saveClothing({ name, style, type, uri }: Clothing): Promise<Clothing | null> {
        try {

            const result = await this.db.insert(ClothingTable)
                .values({
                    clo_name: name,
                    clo_style: style,
                    clo_type: type,
                    clo_uri: uri
                })

            return result.lastInsertRowId ? {
                id: result.lastInsertRowId,
                name,
                style,
                type,
                uri
            } : null;

        } catch (error) {
            console.log("Error en saveClothing repository ", error);
            return null
        }
    }

    async deleteClothing({ id }: Clothing): Promise<boolean> {

        try {

            const resultDB = await this.db
                .delete(ClothingTable)
                .where(eq(ClothingTable.clo_id, id))

            return resultDB.changes != 0

        } catch (error) {
            console.log("Error en deleteClothing repository ", error);
            return false;
        }

    }

    async editClothing(clothing: Clothing): Promise<Clothing | null> {

        const { id, name, style, type, uri } = clothing

        try {

            const resultDB = await this.db.update(ClothingTable).set({
                clo_name: name,
                clo_style: style,
                clo_type: type,
                clo_uri: uri
            }).where(eq(ClothingTable.clo_id, id))

            return resultDB.changes ? clothing : null

        } catch (error) {
            console.log("Error editClothing repository ", error);
            return null;
        }

    }

    async getSingleClothing(clothingId: number): Promise<Clothing | null> {

        try {
            const resultDb = await this.db.select().from(ClothingTable)
                .where(eq(ClothingTable.clo_id, clothingId))

            return this.mapClothingTableTypeToClothing(resultDb)[0]

        } catch (error) {
            console.log("Error en getSingleClothing repository ", error);
            return null;
        }

    }


}

export default ClothingRepository