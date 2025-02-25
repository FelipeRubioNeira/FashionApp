import { ClothingType, Clothing } from "../domain/Types";
import IClothingRepository from "./IClothingRepository";
import { Tables } from "./db/TableNames";
import * as SQLite from 'expo-sqlite';
import { DBConstants } from "./db/DBConstants";
import { injectable } from "tsyringe";
import { ClothingTbType } from "./db/TableTypes";

@injectable()
class ClothingRepository implements IClothingRepository {

    async getClothingList(clothingType?: ClothingType): Promise<ClothingTbType[]> {

        try {

            // 1- abrir la base de datos    
            const db = await SQLite.openDatabaseAsync(DBConstants.DB_NAME);

            // 2- crear la consulta
            let query = `SELECT * 
            FROM ${Tables.CLOTHING}`

            // 3- crear los parametros
            const params = [];

            // Si 'type' es proporcionado, agregamos la cláusula WHERE
            if (clothingType) {
                query += ` WHERE clo_type = ?`;
                params.push(clothingType);
            }

            // 4- ejecutar la consulta
            const statement = await db.prepareAsync(query);

            // 5- Ejecutar la consulta
            const result = await statement.executeAsync<ClothingTbType>(params);

            // 6- Obtener todos los resultados
            const rows = await result.getAllAsync();

            return rows;


        } catch (error) {
            console.log("Error en getClothingList repository ", error);
            return [];
        }
    }

    async saveClothing(clothing: Clothing): Promise<Clothing | null> {
        try {

            const db = await SQLite.openDatabaseAsync(DBConstants.DB_NAME);
            const query = `INSERT INTO ${Tables.CLOTHING} 
            (clo_uri, clo_name, clo_type, clo_style) 
            VALUES (?, ?, ?, ?)`;

            const params = [clothing.uri, clothing.name, clothing.type, clothing.style];
            const result = await db.runAsync(query, params);

            return result.lastInsertRowId ? clothing : null;

        } catch (error) {
            console.log("Error en saveClothing repository ", error);
            return Promise.reject(null)
        }
    }

    async deleteClothing({ uri }: Clothing): Promise<boolean> {

        try {

            const db = await SQLite.openDatabaseAsync(DBConstants.DB_NAME);
            const deleteQuery = `delete from ${Tables.CLOTHING} where clo_uri = ?`;
            const params = [uri];

            const result = await db.runAsync(deleteQuery, params);

            return result.changes != 0;

        } catch (error) {
            console.log("Error en deleteClothing repository ", error);
            return false;
        }

    }

    async editClothing(clothing: Clothing): Promise<Clothing | null> {

        const { id, name, style, type, uri } = clothing

        try {

            const db = await SQLite.openDatabaseAsync(DBConstants.DB_NAME);

            const query = `UPDATE ${Tables.CLOTHING}
            SET CLO_NAME = ?,
            CLO_STYLE = ?,
            CLO_TYPE = ?,
            CLO_URI = ?`

            const params = [name, style, type, uri];

            const statement = await db.prepareAsync(query);
            const result = await statement.executeAsync<Clothing>(params);
            const changes = result.changes;

            if (changes != 0) return clothing
            else return null

        } catch (error) {
            console.log("Error editClothing repository ", error);
            return null;
        }

    }

    async getSingleClothing(clothingId: number): Promise<ClothingTbType | null> {

        try {

            // 1- abrir la base de datos    
            const db = await SQLite.openDatabaseAsync(DBConstants.DB_NAME);

            // 2- crear la consulta
            let query = `SELECT * 
            FROM ${Tables.CLOTHING}
            WHERE CLO_ID = ?
            `

            // 3- crear los parametros
            const params = [clothingId];


            // 4- ejecutar la consulta
            const statement = await db.prepareAsync(query);

            // 5- Ejecutar la consulta
            const result = await statement.executeAsync<ClothingTbType>(params);

            // 6- Obtener todos los resultados
            const row = await result.getFirstAsync();

            return row;


        } catch (error) {
            console.log("Error en getSingleClothing repository ", error);
            return null;
        }

    }


}

export default ClothingRepository