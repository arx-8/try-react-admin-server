/**
 * Number cast-able string
 */
export type NumberLike = string

export const orderTypes = ["ASC", "DESC"] as const

export type OrderType = typeof orderTypes[number]
