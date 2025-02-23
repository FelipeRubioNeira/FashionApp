import { Tables } from "./db/TableNames";
import { ClothingType, Clothing } from "../domain/Types";
import IClothingRepository from "./IClothingRepository";
import * as SQLite from 'expo-sqlite';
import { DBConstants } from "./db/DBConstants";


class ClothingRepository implements IClothingRepository {

    // TODO: Filtrar la consulta por tipo de ropa
    async getClothingList(type?: ClothingType): Promise<Clothing[]> {

        try {

            const db = await SQLite.openDatabaseAsync(DBConstants.DB_NAME);
            let query = `SELECT * 
            FROM ${Tables.CLOTHING}`

            const params = [];

            // Si 'type' es proporcionado, agregamos la cláusula WHERE
            if (type) {
                query += ` WHERE type = ?`;
                params.push(type);
            }

            return db.getAllAsync(query, params);

        } catch (error) {
            console.log("Error getClothingList ", error);
            return [];
        }
    }

    async saveClothing(clothing: Clothing): Promise<Clothing | null> {
        try {

            const db = await SQLite.openDatabaseAsync(DBConstants.DB_NAME);
            const query = `INSERT INTO ${Tables.CLOTHING} 
            (uri, name, type, style) 
            VALUES (?, ?, ?, ?)`;

            const params = [clothing.uri, clothing.name, clothing.type, clothing.style];
            const result = await db.runAsync(query, params);

            console.log("Resultado exitoso saveClothing", result);

            return result.lastInsertRowId ? clothing : null;

        } catch (error) {
            console.log("Error al llamar a saveClothing ", error);
            return Promise.reject(null)
        }
    }


}

export default ClothingRepository