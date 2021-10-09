/**
 * `Object.keys` suitable for TypeScript
 */
export const objectKeys: <T extends string | number>(
  o: Record<T, unknown>
) => T[] = Object.keys
