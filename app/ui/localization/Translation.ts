import { I18n } from "i18n-js";
import { injectable, singleton } from "tsyringe";
import {setLanguage } from "@/store/LanguageSlice";
import ReduxDispatcher from "@/store/ReduxDispatcher";
import { translations } from ".";

@injectable()
@singleton()
export class Translation {


    // --------- Properties --------- //
    private i18n: I18n;


    // --------- Constructor --------- //
    constructor(
        private reduxDispatcher: ReduxDispatcher,
    ) {
        this.i18n = new I18n(translations);

        // Establecer un idioma por defecto
        this.i18n.locale = "es";

    }

    // --------- Methods --------- //
    translate(key: string): string {
        return this.i18n.t(key);
    }

    /**
     * 
     * @param locale - idioma a establecer
     */
    setLocale(locale: string) {
        this.i18n.locale = locale;
        this.reduxDispatcher.dispatch(setLanguage(locale));
    }

    getLocale(): string {
        return this.i18n.locale;
    }


}


