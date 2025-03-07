import { Clothing } from "@/domain/Types";
import { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import { screenWidth } from "../../constants/ScreenDimensions";


const useScrollableImageListViewModel = (clothingList: Clothing[], initialValue?: number) => {

    // ------ state ------ //
    const [isScrolling, setIsScrolling] = useState(false);
    const flatListRef = useRef<FlatList<Clothing>>(null);



    // ------ effects ------ //
    useEffect(() => {
        updateFlatlistPosition(clothingList, initialValue)
    }, [initialValue])

    // ------ methods ------ //
    const handleScroll = () => {
        setIsScrolling(true);
    };

    const handleScrollEnd = () => {
        setIsScrolling(false);
    };

    const calculateItemId = (xPosition: number) => {
        const index = Math.round(xPosition / screenWidth)
        return clothingList[index].id
    }

    const updateFlatlistPosition = (clothingList: Clothing[], initialValue?: number) => {
        if (!initialValue && clothingList.length > 0) return;

        const index = clothingList.findIndex(clothing => clothing.id == initialValue);

        console.log("index => ", index);

        if (index !== -1) {
            try {
                flatListRef.current?.scrollToIndex({
                    index,
                    animated: true,
                });
            } catch (error) {
                console.error("Error scrolling to index:", error);
            }
        }
    }




    // ------ return ------ //
    return {
        isScrolling,
        handleScroll,
        handleScrollEnd,
        flatListRef,
        calculateItemId
    }

}

export default useScrollableImageListViewModel