import dayjs from 'dayjs'
import dayOfYear from 'dayjs/plugin/dayOfYear'
dayjs.extend(dayOfYear)

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function capitalize(string: String) {
  const strArr = string.split(' ')

  strArr.forEach((word) => {
    word = word.charAt(0).toUpperCase() + word.slice(1)
    console.log(word)
  })

  console.log(strArr)
  return strArr.join(' ')
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

export const getChronologicalAge = (dateOfBirth: Date): string => {
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
