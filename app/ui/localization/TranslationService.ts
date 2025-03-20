// translationService.ts
import { container } from "tsyringe";
import { Translation } from "./Translation";
import { store } from "app/store/Store";
import { setLanguage } from "app/store/LanguageSlice";

const translation = container.resolve(Translation);

export const t = (key: string, options?: object): string => {
    return translation.translate(key, options);
};

export const changeLanguage = (locale: string): void => {
    store.dispatch(setLanguage(locale));
};

export const getCurrentLanguage = (): string => {
    return store.getState().language.currentLanguage;
};