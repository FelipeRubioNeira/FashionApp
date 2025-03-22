import ReduxDispatcher from "@/store/ReduxDispatcher";
import { Translation } from "@/ui/i18n/Translation";
import { injectable } from "tsyringe";
import { setLanguage } from "@/store/LanguageSlice";
import { LanguageSelection } from "../types/Types";

@injectable()
class SetupLanguageUseCase {
    constructor(
        private translation: Translation,
        private dispatcher: ReduxDispatcher
    ) { }


    /**
     * 
     * @param language - idioma a establecer
     * 
     * @description - Se actualiza tanto el idioma de la instancia de i18n como el idioma de Redux
     */
    execute(language: LanguageSelection) {
        this.translation.setLocale(language);
        this.dispatcher.dispatch(setLanguage(language));
    }

}

export default SetupLanguageUseCase