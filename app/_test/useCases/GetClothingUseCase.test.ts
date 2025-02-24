// import "reflect-metadata";
// import { container } from 'tsyringe';
// import GetClothingUseCase from '@/app/domain/useCases/GetClothingUseCase';
// import { CategorizedClothingCollection } from '@/app/domain/Types';
// import { DI_TOKENS } from '@/app/di/Container';
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
//             topClothing: [{ id: 1, uri: 'uri1', name: 'Shirt', type: 'TOP', style: 'Casual' }],
//             bottomClothing: [{ id: 2, uri: 'uri2', name: 'Jeans', type: 'BOTTOM', style: 'Casual' }],
//             shoes: [{ id: 3, uri: 'uri3', name: 'Sneakers', type: 'SHOES', style: 'Sport' }],
//         };
//         expect(result).toEqual(expected);
//     });

//     it('should filter clothing by type', async () => {

//         const result = await getClothingUseCase.execute('TOP');

//         const expected: CategorizedClothingCollection = {
//             topClothing: [{ id: 1, uri: 'uri1', name: 'Shirt', type: 'TOP', style: 'Casual' }],
//             bottomClothing: [],
//             shoes: [],
//         };

//         expect(result).toEqual(expected);
//     });

// });
