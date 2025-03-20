import en from './en';
import es from './es';

/**
 * Objeto con todas las traducciones por idioma
 */
export const translations = {
  en,
  es,
};

/**
 * Tipo que representa los idiomas soportados
 */
export type SupportedLanguage = keyof typeof translations;


