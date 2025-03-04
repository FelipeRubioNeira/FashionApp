// import "reflect-metadata";
// import { container } from 'tsyringe';
// import GetClothingUseCase from '@/domain/useCases/GetClothingUseCase';
// import { CategorizedClothingCollection } from '@/domain/Types';
// import { DI_TOKENS } from '@/di/Container';
// import MockClothingRepository from '../mocks/MockClothingRepository';


// describe('GetClothingUseCase', () => {

//     let getClothingUseCase: GetClothingUseCase;

//     beforeEach(() => {
//         container.register(DI_TOKENS.IClothingRepositoryToken, { useClass: MockClothingRepository });
//         getClothingUseCase = container.resolve(GetClothingUseCase);
//     });

//     it('should categorize clothing correctly', async () => {

//         const result = await getClothingUseCase.execute();

//         const expected: CategorizedClothingCollection = {
//             topClothing: [{ id: 1, uri: 'uri1', name: 'Shirt', type: 'Superior', style: 'Casual' }],
//             bottomClothing: [{ id: 2, uri: 'uri2', name: 'Jeans', type: 'Inferior', style: 'Casual' }],
//             shoes: [{ id: 3, uri: 'uri3', name: 'Sneakers', type: 'Zapatos', style: 'Sport' }],
//         };
//         expect(result).toEqual(expected);
//     });

//     it('should filter clothing by type', async () => {

//         const result = await getClothingUseCase.execute('Superior');

//         const expected: CategorizedClothingCollection = {
//             topClothing: [{ id: 1, uri: 'uri1', name: 'Shirt', type: 'Superior', style: 'Casual' }],
//             bottomClothing: [],
//             shoes: [],
//         };

//         expect(result).toEqual(expected);
//     });

// });
