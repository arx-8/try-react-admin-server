/**
 * `Object.keys` suitable for TypeScript
 */
export const objectKeys: <T extends string | number>(
  o: Record<T, unknown>
) => T[] = Object.keys

export const toLowerCase = <T extends string>(x: T): Lowercase<T> => {
  return x.toLowerCase() as any
}
