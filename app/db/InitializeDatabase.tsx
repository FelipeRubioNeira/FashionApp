import { SQLiteDatabase } from 'expo-sqlite';
import { Tables } from './TableNames';



const useIntializeDatabase = () => {


    // --------------- effects --------------- //
    const initializeDatabase = async (db: SQLiteDatabase) => {
        await createTables(db);
    }


    // --------------- methods --------------- //
    const createTables = async (db: SQLiteDatabase) => {

        const topClothesTable = `CREATE TABLE IF NOT EXISTS ${Tables.TOP_CLOTHING} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            uri TEXT NOT NULL
        )`

        await db.execAsync(topClothesTable);

    }


    // --------------- return --------------- //
    return {
        initializeDatabase
    }

}

export default useIntializeDatabase;