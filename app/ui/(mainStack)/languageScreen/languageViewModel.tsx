import { useRouter } from "expo-router"
import { LanguageSelection } from "@/domain/Types"
import SetupLanguageUseCase from "@/domain/useCases/SetupLanguageUseCase"



const useLanguageScreenViewModel = (
    setupLanguageUseCase: SetupLanguageUseCase
) => {

    const router = useRouter()


    /**
     * @param language -  from the enum
     */
    const setLanguage = async (language: LanguageSelection) => {

        setupLanguageUseCase.execute(language)
        naviagateToMyCloset()

    }


    const naviagateToMyCloset = () => {
        router.push("/ui/(mainStack)/(drawer)")

    }

    return {
        naviagateToMyCloset,
        setLanguage,

    }
}

export default useLanguageScreenViewModel