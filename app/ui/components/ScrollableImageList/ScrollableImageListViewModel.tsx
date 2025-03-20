import { Clothing } from "FashonApp/src/domain/Types";
import { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import { screenWidth } from "../../constants/screenDimensions";


interface ScrollableImageListViewModelProps {
    clothingList: Clothing[],
    initialValue?: number,
}


const useScrollableImageListViewModel = ({
    clothingList = [],
    initialValue,
}: ScrollableImageListViewModelProps) => {

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
        const index = Math.round(xPosition / screenWidth);

        if (index < 0 || index >= clothingList.length) return undefined;
        return clothingList[index].id;

    }

    const updateFlatlistPosition = (clothingList: Clothing[], initialValue?: number) => {

        try {

            if (!initialValue || clothingList.length == 0) {
                return
            };

            const index = clothingList.findIndex(clothing => clothing.id == initialValue);

            if (index == -1) return

            // Scroll to the item at the calculated index
            flatListRef.current?.scrollToIndex({
                index,
                animated: true,
            });

        } catch (error) {
            console.error("Error updating FlatList position:", error);

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