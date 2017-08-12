import moment from 'moment'

/**
 * You can use these methods anywhere, but they are mostly intended for
 * use in views. These methods are all loaded onto $rootScope.
 * Refer to core/bootstrap.js
 */

export const allResolved = (...items) => items.reduce((s,x) => s && x, true)

/**
 * These methods are all used for doing miscellaneous common object comparisons
 * They can be imported individually via destructuring
 * or all at once as a single object
 */
export const isNone  = x         => x === null || x === undefined
export const isEmpty = x         => x.length !== undefined ? x.length : JSON.stringify(x) === '{}'
export const ife     = (a, b, c) => a ? b : c

/**
 * These methods are all used for formatting, modifying or comparing Dates
 * They can be imported individually via destructuring
 * or all at once as a single object
 */
export const fmt       = (date, format) => moment(date).format(format)
export const isSameDay = (date1, date2) => moment(date1).isSame(date2, 'day')
export const isBefore  = (date1, date2) => moment(date1).isBefore(date2)
export const isAfter   = (date1, date2) => moment(date1).isAfter(date2)
export const dayBefore = (date)         => moment(date).subtract(1, 'day')
export const dayAfter  = (date)         => moment(date).add(1, 'day')

/**
 * These methods are all used for transforming or checking Numbers
 * They can be imported individually via destructuring
 * or all at once as a single object
 */
export const isNumberStr = (str) => String(parseInt(str)) === String(str)

/**
 * These methods are all used for transforming or comparing Strings
 * They can be imported individually via destructuring
 * or all at once as a single object
 */
export const ucfirst     = str          => str[0].toUpperCase() + str.slice(1)
export const camelCase   = str          => str.replace(/-([a-z])/g, c => c[1].toUpperCase())
export const classify    = str          => ucfirst(camelCase(str))
export const slugify     = str          => str.toLowerCase().replace(/\s/g, '-')
export const unslugify   = str          => str.replace(/\-/g, ' ')
export const contains    = (str1, str2) => str1.indexOf(str2) !== -1
export const beginsWith  = (str1, str2) => str1.indexOf(str2) === 0

export default {
	allResolved,
	isNone, isEmpty, ife,
	fmt, isSameDay, isBefore, isAfter, dayBefore, dayAfter,
	isNumberStr,
	ucfirst, camelCase, classify, slugify, unslugify, contains,
}