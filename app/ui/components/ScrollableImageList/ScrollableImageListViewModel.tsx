import { Clothing } from "@/app/domain/Types";
import { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";

interface useScrollableImageListViewModelProps {
    clothingList: Clothing[]
}


const useScrollableImageListViewModel = ({
    clothingList
}: useScrollableImageListViewModelProps) => {


    // ------ state ------ //
    const [isScrolling, setIsScrolling] = useState(false);
    const [localClothingList, setLocalClothingList] = useState<Clothing[]>([])
    const flatListRef = useRef<FlatList>(null);



    // ------ effects ------ //
    useEffect(() => {
        handleUpdatedList()
    }, [clothingList.length])


    // ------ methods ------ //
    const handleScroll = () => {
        setIsScrolling(true);
    };

    const handleScrollEnd = () => {
        setIsScrolling(false);
    };

    const handleUpdatedList = () => {

        setLocalClothingList(clothingList)

        if (localClothingList.length >= 1) {
            flatListRef.current?.scrollToIndex({
                index: localClothingList.length - 1,
                animated: true,
            })
        }
    }



    // ------ returnF ------ //
    return {
        isScrolling,
        handleScroll,
        handleScrollEnd,
        localClothingList,
        flatListRef
    }

}

export default useScrollableImageListViewModel