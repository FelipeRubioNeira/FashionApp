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
            clo_id INTEGER PRIMARY KEY AUTOINCREMENT,
            clo_uri TEXT NOT NULL,
            clo_name TEXT NOT NULL,
            clo_type TEXT NOT NULL,
            clo_style TEXT NOT NULL
        )`

        await db.execAsync(topClothesTable);

    }


    // --------------- return --------------- //
    return {
        initializeDatabase
    }

}

export default useIntializeDatabase;