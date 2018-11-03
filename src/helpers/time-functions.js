import { format } from 'date-fns'

export const timeTypes = ['sprint work', 'meeting', 'break', 'other']

export const today = () => format(new Date(), 'YYYY-MM-DD')

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]