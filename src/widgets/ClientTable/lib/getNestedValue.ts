type AnyObject = Record<string, any>;

export function getNestedValue<T>(
  obj: AnyObject | null | undefined,
  path?: string,
  defaultValue: T[] = []
): T[] {
  if (!obj) return defaultValue;

  // If no path is provided, return the object itself if it's an array
  if (!path || path === "") {
    return Array.isArray(obj) ? (obj as T[]) : defaultValue;
  }

  const pathArray = path
    .replace(/\[/g, ".")
    .replace(/\]/g, "")
    .split(".")
    .filter(Boolean);

  const result = pathArray.reduce<any>((acc, key) => acc?.[key], obj);

  return Array.isArray(result) ? (result as T[]) : defaultValue;
}
