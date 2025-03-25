export enum FONT_FAMILY {

    // Playfair Display
    PLAYFAIR_REGULAR = 'PlayfairRegular',
    PLAYFAIR_REGULAR_I = 'PlayfairRegularI',
    
    PLAYFAIR_BOLD = 'PlayfairBold',
    PLAYFAIR_BLACK = 'PlayfairBlack',



    // Poppins
    POPPINS_LIGHT = 'PoppinsLight',
    POPPINS_REGULAR = 'PoppinsRegular',
    POPPINS_BOLD = 'PoppinsBold',

}


// Mapeo para cargar con useFonts
export const FONT_FILES = {
    
    [FONT_FAMILY.PLAYFAIR_REGULAR]: require('../../../../assets/fonts/PlayfairDisplaySC-Regular.ttf'),
    [FONT_FAMILY.PLAYFAIR_REGULAR_I]: require('../../../../assets/fonts/PlayfairDisplaySC-Italic.ttf'),
    [FONT_FAMILY.PLAYFAIR_BOLD]: require('@/../assets/fonts/PlayfairDisplaySC-Bold.ttf'),
    [FONT_FAMILY.PLAYFAIR_BLACK]: require('@/../assets/fonts/PlayfairDisplaySC-Black.ttf'),

    [FONT_FAMILY.POPPINS_LIGHT]: require('@/../assets/fonts/Poppins-Light.ttf'),
    [FONT_FAMILY.POPPINS_REGULAR]: require('@/../assets/fonts/Poppins-Regular.ttf'),
    [FONT_FAMILY.POPPINS_BOLD]: require('@/../assets/fonts/Poppins-Bold.ttf'),

};