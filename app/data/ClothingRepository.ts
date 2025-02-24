import { ClothingType, Clothing } from "../domain/Types";
import IClothingRepository from "./IClothingRepository";
import { Tables } from "./db/TableNames";
import * as SQLite from 'expo-sqlite';
import { DBConstants } from "./db/DBConstants";
import { injectable } from "tsyringe";
import { ClothingTbType } from "./db/TableTypes";

@injectable()
class ClothingRepository implements IClothingRepository {

    // TODO: Filtrar la consulta por tipo de ropa
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

            // 7- Cerrar la base de datos
            await db.closeAsync();

            return rows;


        } catch (error) {
            console.log("Error getClothingList ", error);
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

            console.log("Resultado exitoso saveClothing", result);

            return result.lastInsertRowId ? clothing : null;

        } catch (error) {
            console.log("Error al llamar a saveClothing ", error);
            return Promise.reject(null)
        }
    }

    async deleteClothing({ uri }: Clothing): Promise<boolean> {

        try {

            const db = await SQLite.openDatabaseAsync(DBConstants.DB_NAME);
            const deleteQuery = `delete from ${Tables.CLOTHING} where cl_uri = ?`;
            const params = [uri];

            const result = await db.runAsync(deleteQuery, params);

            return result.changes != 0;

        } catch (error) {
            console.log("Error al eliminar la ropa ", error);
            return false;
        }

    }


}

export default ClothingRepository