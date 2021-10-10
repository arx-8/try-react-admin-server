/* eslint-disable @typescript-eslint/no-explicit-any */
export const excludeUntestableHeaders = (
  headers: Record<string, any>
): Record<string, any> => {
  delete headers.date
  return headers
}
