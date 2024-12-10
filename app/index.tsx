import { View, StyleSheet } from "react-native";
import ScreenCmp from "./ui/components/ScreenCmp";
import ScrollableImageList from "./ui/components/ScrollableImageList";
import { topClothes, bottomClothes, shoesClothes } from "./assets/index"




export default function HomePage() {

    return (
        <ScreenCmp>
            <View style={localStyles.screen}>


                {/* view para la parte superior de la ropa */}
                <ScrollableImageList
                    style={{ flex: 2 }}
                    clotheList={topClothes}
                    galleryType="top"
                />


                {/* view para la parte inferior de la ropa */}
                <ScrollableImageList
                    style={{ flex: 2 }}
                    clotheList={bottomClothes}
                    galleryType="bottom"
                />


                {/* view para la parte zapatos */}
                <ScrollableImageList
                    style={{ flex: 1 }}
                    clotheList={shoesClothes}
                    galleryType="shoes"
                />


            </View>
        </ScreenCmp>
    )

}

const localStyles = StyleSheet.create({

    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 0
    }

})


