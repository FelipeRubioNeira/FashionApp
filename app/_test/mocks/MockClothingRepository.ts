import { Clothing, ClothingType, } from '@/domain/Types'
import { ClothingTableType } from '@/data/db/Schema';
import IClothingRepository from '@/data/interfaces/IClothingRepository';

// Mock del repositorio
class MockClothingRepository implements IClothingRepository {
    async getClothingList(clothingType?: ClothingType): Promise<Clothing[]> {

        const items: Clothing[] = [
            { id: 1, uri: 'uri1', name: 'Shirt', type: 'Superior', style: 'Casual' },
            { id: 2, uri: 'uri2', name: 'Jeans', type: 'Inferior', style: 'Casual' },
            { id: 3, uri: 'uri3', name: 'Sneakers', type: 'Zapatos', style: 'Sport' },
        ];

        if (!clothingType) {
            return items;
        }

        return items.filter(item => item.type === clothingType);
    }

    saveClothing(clothing: Clothing): Promise<Clothing | null> {
        return Promise.reject(null)
    }

    deleteClothing(clothing: Clothing): Promise<boolean> {
        return Promise.reject(false)
    }

    editClothing(clothing: Clothing): Promise<Clothing | null> {
        return Promise.reject(null)
    }

    getSingleClothing(clothingId: number): Promise<Clothing | null> {
        return Promise.reject(null)
    }

}

export default MockClothingRepository
