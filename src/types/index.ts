export * from './products'
export * from './VivinoWine'

export type Selector<T> = (t: T) => unknown

export type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType[number]

export type Result<T> = { err: Error; data: null } | { err: null; data: T }
