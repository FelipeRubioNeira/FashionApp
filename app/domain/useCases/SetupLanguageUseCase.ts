import ReduxDispatcher from "@/store/ReduxDispatcher";
import { Translation } from "@/ui/localization/Translation";
import { injectable } from "tsyringe";
import { setLanguage } from "@/store/LanguageSlice";
import { LanguageSelection } from "../Types";

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

        console.log("idioma antes de actualizarlo " , this.translation.getLocale());

        this.translation.setLocale(language);
        this.dispatcher.dispatch(setLanguage(language));

        console.log("idioma despues de actualizarlo " , this.translation.getLocale());
    }

}

export default SetupLanguageUseCase