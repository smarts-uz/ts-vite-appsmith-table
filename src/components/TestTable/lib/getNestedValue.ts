type AnyObject = Record<string, any>;

export function getNestedValue<T extends AnyObject = AnyObject>(
  obj: AnyObject | null | undefined,
  path: string,
  defaultValue: T[] = []
): T[] {
  if (!path || typeof path !== "string" || !obj) {
    return defaultValue;
  }

  const pathArray = path
    .replace(/\[/g, ".")
    .replace(/\]/g, "")
    .split(".")
    .filter(Boolean);

  const result = pathArray.reduce((acc: any, key) => acc?.[key], obj);

  return Array.isArray(result) ? (result as T[]) : defaultValue;
}
