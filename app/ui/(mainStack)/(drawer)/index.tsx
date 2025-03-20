import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function DrawerIndex() {

    const router = useRouter()

    useEffect(()=>{

        router.replace({
            pathname: '/ui/(mainStack)/(drawer)/(closetStack)/myClosetScreen',
        })

    },[router])
}