import { ClotheType } from '../ui/components/ScrollableImageList';

// ------------ top ------------ //
import Polera from './shirt.svg';
import Camisa from './long_shirt.svg';
import Polo from './polo.svg';

// ------------ bottom ------------ //
import Pantalones from './pants.svg';
import Shorts from './shorts.svg';


// ------------ shoes ------------ //
import Vans from './vans.svg';
import Saldalias from './sandals.svg';
import Zapatos from './shoes.svg';




const topClothes: Array<ClotheType> = [
    { name: "Camisa", Image: Camisa },
    { name: "Polera", Image: Polera },
    { name: "Polo", Image: Polo },
]

const bottomClothes: Array<ClotheType> = [
    { name: "Pantalones", Image: Pantalones },
    { name: "Shorts", Image: Shorts },
]

const shoesClothes: Array<ClotheType> = [
    { name: "Vans", Image: Vans },
    { name: "Sandalias", Image: Saldalias },
    { name: "Zapatos", Image: Zapatos },
]


export {
    topClothes,
    bottomClothes,
    shoesClothes,
}