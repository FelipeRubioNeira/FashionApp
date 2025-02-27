import { Clothing } from "@/app/domain/Types";
import { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";


const useScrollableImageListViewModel = () => {

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




    // ------ returnF ------ //
    return {
        isScrolling,
        handleScroll,
        handleScrollEnd,
        flatListRef
    }

}

export default useScrollableImageListViewModel