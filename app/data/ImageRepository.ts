import { injectable } from "tsyringe";
import { Clothing, ClothingType } from "../domain/types/Types";
import IClothingRepository from "./interfaces/IClothingRepository";
import * as FileSystem from 'expo-file-system';
import { ClothingTableType } from "./db/Schema";


@injectable()
class ImageRepository implements IClothingRepository {

    async saveClothing(clothing: Clothing): Promise<Clothing | null> {

        const { uri } = clothing

        try {

            const fileInfo = await FileSystem.getInfoAsync(uri);

            // ...validate temporalUri 
            if (!fileInfo.exists) return null;

            // Definir la URI final en el directorio de documentos
            const newDate = new Date().getTime();
            const finalUri = `${FileSystem.documentDirectory}images/${newDate}.jpg`;

            console.log("uri original", uri);
            console.log("finalUri", finalUri);


            // Mover el archivo usando FileSystem
            await FileSystem.copyAsync({
                from: uri,
                to: finalUri,
            });

            return {
                ...clothing,
                uri: finalUri
            };

        } catch (error) {
            console.error('Error al mover la imagen:', error);
            throw error; // Re-lanzar el error si es necesario manejarlo a nivel superior
        }

    }

    async deleteClothing({ uri }: Clothing): Promise<boolean> {
        try {

            const fileInfo = await FileSystem.getInfoAsync(uri);

            // ...validate temporalUri 
            if (!fileInfo.exists) return false;

            // Eliminar el archivo usando FileSystem
            await FileSystem.deleteAsync(uri);

            return true;

        } catch (error) {
            console.error('Error al eliminar la imagen:', error);
            throw error; // Re-lanzar el error si es necesario manejarlo a nivel superior
        }

    }

    editClothing(clothing: Clothing): Promise<Clothing | null> {
        console.log("No se ha implementado el metodo getCloeditClothingthingList ")
        return Promise.resolve(null)
    }

    getSingleClothing(clothingId: number): Promise<Clothing | null> {
        console.log("No se ha implementado el metodo getSingleClothing")
        return Promise.resolve(null)
    }

    getClothingList(type?: ClothingType): Promise<Clothing[]> {
        console.log("No se ha implementado el metodo getClothingList ")
        return Promise.resolve([])
    }



}

export default ImageRepository;