import { ClothingType, Clothing } from "../domain/Types";
import IClothingRepository from "./IClothingRepository";
import { Tables } from "./db/TableNames";
import { injectable } from "tsyringe";
import { ClothingTbType } from "./db/TableTypes";

import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { DBConstants } from "./db/DBConstants";
import { ClothingTable } from "./db/Schema";
import { eq } from 'drizzle-orm';


@injectable()
class ClothingRepository implements IClothingRepository {

    private async getDBConection() {
        const expo = await SQLite.openDatabaseAsync(DBConstants.DB_NAME);
        const db = drizzle(expo);
        return db
    }

    async getClothingList(clothingType?: ClothingType): Promise<ClothingTbType[]> {

        try {

            const db = await this.getDBConection()

            let resultDB = []

            if (clothingType) {

                resultDB = await db
                    .select()
                    .from(ClothingTable)
                    .where(eq(ClothingTable.clo_type, clothingType || ""))

            } else {
                resultDB = await db.select().from(ClothingTable)
            }

            return resultDB;


        } catch (error) {
            console.log("Error en getClothingList repository ", error);
            return [];
        }
    }

    async saveClothing({ name, style, type, uri }: Clothing): Promise<Clothing | null> {
        try {

            const db = await this.getDBConection()

            const result = await db.insert(ClothingTable).values({
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

            const db = await this.getDBConection()

            const resultDB = await db
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

            const db = await this.getDBConection()

            const resultDB = await db.update(ClothingTable).set({
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

    async getSingleClothing(clothingId: number): Promise<ClothingTbType | null> {

        try {

            const db = await this.getDBConection()

            const resultDB = await db.select().from(ClothingTable)
                .where(eq(ClothingTable.clo_id, clothingId))

            return resultDB[0]


        } catch (error) {
            console.log("Error en getSingleClothing repository ", error);
            return null;
        }

    }


}

export default ClothingRepository