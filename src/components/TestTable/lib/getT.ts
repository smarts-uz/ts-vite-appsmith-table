type Translations = Record<string, string>;
type Replacements = Record<string, string | number | boolean | null | undefined>;

export const getT =
  (translations: Translations, defaultTranslations: Translations) =>
  <K extends keyof typeof defaultTranslations>(
    key: K,
    replacements: Replacements = {}
  ): string => {
    const template = translations?.[key] ?? defaultTranslations[key];
    if (!template) {
      return String(key);
    }
    return Object.entries(replacements).reduce(
      (acc, [placeholder, value]) =>
        acc.replace(new RegExp(`{${placeholder}}`, "g"), String(value)),
      template
    );
  };
