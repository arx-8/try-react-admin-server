/**
 * Number cast-able string
 */
export type NumberLike = string

export const orderTypes = ["ASC", "DESC"] as const

export type OrderType = typeof orderTypes[number]

export type ErrorResponseBody = {
  message: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GetListRequestParams<T extends Record<string, any>> = Readonly<
  Partial<{
    _end: NumberLike
    _order: OrderType
    _sort: keyof T
    _start: NumberLike
    /**
     * ## e.g.
     * - ['1', '9']
     * - '9'
     */
    id: NumberLike | NumberLike[]
  }>
>

/**
 * for lodash flow (left to right)
 */
export type FlowAbleFunction = <T>(collection2: T[]) => T[]

/**
 * Do not response top level array json
 * @see https://stackoverflow.com/questions/3503102/what-are-top-level-json-arrays-and-why-are-they-a-security-risk
 */
export type ListResponse<T> = {
  data: T[]
}
