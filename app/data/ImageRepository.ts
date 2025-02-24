import { injectable } from "tsyringe";
import { Clothing, ClothingType } from "../domain/Types";
import IClothingRepository from "./IClothingRepository";
import * as FileSystem from 'expo-file-system';
import { ClothingTbType } from "./db/TableTypes";

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
            const finalUri = `${FileSystem.documentDirectory}/images/${newDate}.jpg`;

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

    getClothingList(type?: ClothingType): Promise<ClothingTbType[]> {
        console.log("No se ha implementado getClothingList ")
        return Promise.resolve([])
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
            console.error('Error al mover la imagen:', error);
            throw error; // Re-lanzar el error si es necesario manejarlo a nivel superior
        }

    }

}

export default ImageRepository;