import dayjs from 'dayjs'
import dayOfYear from 'dayjs/plugin/dayOfYear'
dayjs.extend(dayOfYear)

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function formatPhoneNumber(normalizedNumber: string | undefined) {
  const cleanedNumber = ('' + normalizedNumber).replace(/\D/g, '')
  const match = cleanedNumber.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }

  throw new Error('Unable to format phone number')
}

export function humanizeEnum(string: string) {
  const spacedString = string.replace('_', ' ').toLowerCase()
  return spacedString
}

export const getBadgeColor = (string: string, includeBackground: Boolean = true): string => {
  string = string.toLowerCase()
  const tags = {
    new: 'blue',
    'expressive language': 'blue',

    open: 'green',
    'receptive language': 'green',
    'in progress': 'green',

    'pragmatics/social skills': 'yellow',
    discontinued: 'yellow',

    'articulation/phonology': 'indigio',

    fluency: 'purple',

    feeding: 'pink',

    canceled: 'red',
    'on hold': 'red',
  }

  const color = tags[string] || 'gray'

  return includeBackground ? `bg-${color}-100 text-${color}-800` : `text-${color}-800`
}

export const currencyFormatter = new Intl.NumberFormat('en-us', {
  style: 'currency',
  currency: 'USD',
})

export const getChronologicalAge = (dateOfBirth: Date | null): string => {
  if (!dateOfBirth) {
    throw new Error('No Date object specified')
  }

  const years = dayjs().diff(dateOfBirth, 'years', false)
  const days = dayjs().diff(dateOfBirth, 'days', false)
  let months = dayjs().diff(dateOfBirth, 'months', false) - years * 12

  if (days >= 15) {
    months += 1
  }

  return `${years} year${years === 1 ? '' : 's'} ${months} month${months === 1 ? '' : 's'}`
}

export const isBirthday = (dateOfBirth: Date): boolean => {
  return (
    dayjs().dayOfYear() - dayjs(dateOfBirth).dayOfYear() > -7 &&
    dayjs().dayOfYear() - dayjs(dateOfBirth).dayOfYear() < 7
  )
}
