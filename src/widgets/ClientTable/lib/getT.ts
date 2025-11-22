type Translations = Record<string, string> | undefined;
type Replacements = Record<string, string>;

export const getT = <T extends Record<string, string>>(
  translations: Translations,
  defaultTranslations: T
) => {
  return (
    key: keyof T | string,
    replacements: Replacements = {}
  ): string => {
    const template =
      (translations && translations[key as string]) ??
      (defaultTranslations && defaultTranslations[key as keyof T]);

    if (!template) {
      return String(key);
    }
    return Object.entries(replacements).reduce(
      (acc, [placeholder, value]) =>
        acc.replace(new RegExp(`{${placeholder}}`, "g"), String(value)),
      template
    );
  };
};
