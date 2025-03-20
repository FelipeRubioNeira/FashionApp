// Importación conjunta de todos los casos de uso
import AddClothingUseCase from "./AddClothingUseCase";
import CreateOutfitUseCase from "./CreateOutfitUseCase";
import DeleteClothingUseCase from "./DeleteClothingUseCase";
import DeleteOutfitUseCase from "./DeleteOutfitUseCase";
import DuplicateOutfitUseCase from "./DuplicateOutfitUseCase";
import EditClothingUseCase from "./EditClothingUseCase";
import EditOutfitUseCase from "./EditOutfitUseCase";
import GetClothingUseCase from "./GetClothingUseCase";
import GetOutfitsUseCase from "./GetOutfitsUseCase";
import GetSingleClothingUseCase from "./GetSingleClothingUseCase";

// Exportación de todos los casos de uso
export {
    // Operaciones de ropa
    AddClothingUseCase,
    DeleteClothingUseCase,
    EditClothingUseCase,
    GetClothingUseCase,
    GetSingleClothingUseCase,

    // Operaciones de atuendos
    CreateOutfitUseCase,
    DeleteOutfitUseCase,
    DuplicateOutfitUseCase,
    EditOutfitUseCase,
    GetOutfitsUseCase,
};


