import { injectable } from "tsyringe";
import { Clothing } from "../domain/Types";
import IClothingRepository from "./IClothingRepository";
import * as FileSystem from 'expo-file-system';

@injectable()
class ImageRepository implements IClothingRepository {

    async saveClothing({ name, style, type, uri }: Clothing): Promise<Clothing | null> {

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

            console.log("se guardara la imagen en la direccion : ", finalUri);

            return {
                name,
                style,
                type,
                uri: finalUri
            };

        } catch (error) {
            console.error('Error al mover la imagen:', error);
            throw error; // Re-lanzar el error si es necesario manejarlo a nivel superior
        }

    }

    getClothingList(type?: import("../domain/Types").ClothingType | undefined): Promise<import("../domain/Types").Clothing[]> {
        throw new Error("Method not implemented.");
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