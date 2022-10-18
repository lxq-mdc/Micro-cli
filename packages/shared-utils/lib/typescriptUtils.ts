/**
 * @description 删除联合类型中的undefined
 * @example 如 '1' | 2 | undefined, 则会返回 '1' | 2
 */
export type DeleteUndefinedInUnion<T> = T extends undefined ? never : T;
