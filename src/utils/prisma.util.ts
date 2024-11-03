// exposes a function to exclude keys from an object
export function exclude<T, Key extends keyof T>(
  user: T,
  keys: Key[],
): Omit<T, Key> {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key as Key)),
  ) as Omit<T, Key>;
}
