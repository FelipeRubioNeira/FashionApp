import { Clothing } from "@/app/domain/Types";
import { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";


const useScrollableImageListViewModel = (updatedClothingList: Clothing[]) => {


    // ------ state ------ //
    const [isScrolling, setIsScrolling] = useState(false);
    const flatListRef = useRef<FlatList<Clothing>>(null);



    // ------ effects ------ //
    useEffect(() => {

        console.log("Se ha actualizado la flatlist");

        handleUpdatedList()
    }, [updatedClothingList])

    // ------ methods ------ //
    const handleScroll = () => {
        setIsScrolling(true);
    };

    const handleScrollEnd = () => {
        setIsScrolling(false);
    };

    const handleUpdatedList = () => {
        flatListRef.current?.scrollToEnd()
    }



    // ------ returnF ------ //
    return {
        isScrolling,
        handleScroll,
        handleScrollEnd,
        flatListRef
    }

}

export default useScrollableImageListViewModel