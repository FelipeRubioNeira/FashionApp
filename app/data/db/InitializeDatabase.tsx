import { Tables } from './TableNames';
import { SQLiteDatabase, openDatabaseAsync } from 'expo-sqlite';


const useIntializeDatabase = () => {


    // --------------- effects --------------- //
    const initializeDatabase = async () => {
        const db = await openDatabaseAsync('moda.db');
        await createTables(db);
    }


    // --------------- methods --------------- //
    const createTables = async (db: SQLiteDatabase) => {

        const topClothesTable = `CREATE TABLE IF NOT EXISTS ${Tables.CLOTHING} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            uri TEXT NOT NULL,
            name TEXT NOT NULL,
            type TEXT NOT NULL,
            style TEXT NOT NULL
        )`

        await db.execAsync(topClothesTable);

    }


    // --------------- return --------------- //
    return {
        initializeDatabase
    }

}

export default useIntializeDatabase;