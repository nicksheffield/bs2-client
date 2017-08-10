import moment from 'moment'

export const fmt       = (date, format) => moment(date).format(format)
export const sameDay   = (date1, date2) => moment(date1).isSame(date2, 'day')
export const isBefore  = (date1, date2) => moment(date1).isBefore(date2)
export const isAfter   = (date1, date2) => moment(date1).isAfter(date2)
export const dayBefore = (date)         => moment(date).subtract(1, 'day')
export const dayAfter  = (date)         => moment(date).add(1, 'day')