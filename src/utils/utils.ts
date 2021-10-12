/**
 * `Object.keys` suitable for TypeScript
 */
export const objectKeys: <T extends string | number>(
  o: Record<T, unknown>
) => T[] = Object.keys

export const toLowerCase = <T extends string>(x: T): Lowercase<T> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return x.toLowerCase() as any
}

/**
 * @returns
 *    - true: It has 1 or more elements. (is not empty),
 *    - false: It is empty
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const hasElement = (x: Record<string, any> | any[]): boolean => {
  if (Array.isArray(x)) {
    return x.length !== 0
  }
  return objectKeys(x).length !== 0
}
