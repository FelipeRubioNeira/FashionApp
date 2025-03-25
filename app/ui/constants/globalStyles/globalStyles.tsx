import { StyleSheet } from "react-native";
import { FONT_FAMILY, FONT_SIZE } from "../fonts";
import Colors from "../colors";



const globalStyles = StyleSheet.create({

    TITLE: {
        fontFamily: FONT_FAMILY.PLAYFAIR_BOLD,
        fontSize: FONT_SIZE.XLARGE,
    },
    BUTTON: {
        fontFamily: FONT_FAMILY.POPPINS_REGULAR,
        fontSize: FONT_SIZE.MEDIUM,
    },
    SHADOW:{
        shadowColor: Colors.BLACK,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4
    }

})

export default globalStyles