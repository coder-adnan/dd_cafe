const dictionaries = {
    en: () => import('./dictionaries/en.json').then((module) => module.default),
    ar: () => import('./dictionaries/ar.json').then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;
export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

export const LOCALES: Locale[] = ['en', 'ar'];
export const DEFAULT_LOCALE: Locale = 'en';

export const getDictionary = async (locale: Locale) => {
    return dictionaries[locale]?.() ?? dictionaries[DEFAULT_LOCALE]();
};
