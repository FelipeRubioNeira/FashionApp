import { View, StyleSheet } from "react-native";
import ScreenCmp from "./ui/components/ScreenCmp";
import ScrollableImageList from "./ui/components/ScrollableImageList";
import { TopClothingType } from "./db/TableTypes";
import { useEffect, useState } from "react";
import * as FileSystem from 'expo-file-system'
import { useSQLiteContext } from "expo-sqlite";
import { Tables } from "./db/TableNames";



const MyCloset = () => {

    // --------------- hooks --------------- //
    const db = useSQLiteContext()

    const [topClothingList, setTopClothingList] = useState<TopClothingType[]>([])

    useEffect(() => {
        getAllClothing()
    },[])


    const getAllClothing = async () => {

        try {
            setTopClothingList(await getAllDBImages())

        } catch (error) {
            console.log("Error al obtener las prendas ", error);
        }

    }

    const getAllDBImages = async () => {
        const query = `SELECT * FROM ${Tables.TOP_CLOTHING}`
        const result = await db.getAllAsync<TopClothingType>(query)
        const validImages = await validateUriImages(result)

        return validImages
    }


    const validateUriImages = async (imageList: TopClothingType[]) => {

        const validImages = await Promise.all(
            imageList.map(async (image) => {

                if (!image.uri) return null;
                const fileInfo = await FileSystem.getInfoAsync(image.uri);

                return fileInfo.exists ? image : null;
            })

        ).then(results => results.filter(image => image !== null));

        return validImages
    }



    return (
        <ScreenCmp>
            <View style={localStyles.screen}>


                {/* view para la parte superior de la ropa */}
                <ScrollableImageList
                    style={{ flex: 2 }}
                    clothingList={topClothingList}
                    galleryType="top"
                />


                {/* view para la parte inferior de la ropa */}
                <ScrollableImageList
                    style={{ flex: 2 }}
                    clothingList={[]}
                    galleryType="bottom"

                />


                {/* view para la parte zapatos */}
                <ScrollableImageList
                    style={{ flex: 1 }}
                    clothingList={[]}
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
    }

})

export default MyCloset
