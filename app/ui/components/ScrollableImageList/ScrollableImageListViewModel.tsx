import { Clothing } from "@/domain/Types";
import { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import { screenWidth } from "../../constants/ScreenDimensions";


const useScrollableImageListViewModel = (clothingList: Clothing[]) => {

    // ------ state ------ //
    const [isScrolling, setIsScrolling] = useState(false);
    const flatListRef = useRef<FlatList<Clothing>>(null);



    // ------ effects ------ //

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