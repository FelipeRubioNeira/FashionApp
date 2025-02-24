import { ClothingType, } from '@/app/domain/Types'
import { ClothingTbType } from '@/app/data/db/TableTypes'

// Mock del repositorio
class MockClothingRepository {
    async getClothingList(clothingType?: ClothingType): Promise<ClothingTbType[]> {

        const items: ClothingTbType[] = [
            { clo_id: 1, clo_uri: 'uri1', clo_name: 'Shirt', clo_type: 'TOP', clo_style: 'Casual' },
            { clo_id: 2, clo_uri: 'uri2', clo_name: 'Jeans', clo_type: 'BOTTOM', clo_style: 'Casual' },
            { clo_id: 3, clo_uri: 'uri3', clo_name: 'Sneakers', clo_type: 'SHOES', clo_style: 'Sport' },
        ];

        if (!clothingType) {
            return items;
        }

        return items.filter(item => item.clo_type === clothingType);
    }
}

export default MockClothingRepository
