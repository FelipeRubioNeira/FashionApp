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
        navigateToMyCloset()

    }


    const navigateToMyCloset = () => {
        router.push("/ui/(mainStack)/(drawer)")

    }

    return {
        setLanguage,

    }
}

export default useLanguageScreenViewModel