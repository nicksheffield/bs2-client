

export const isNone  = x => x === null || x === undefined
export const isEmpty = x => x.length !== undefined ? x.length : JSON.stringify(x) === '{}'