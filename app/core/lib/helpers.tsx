export function capitalize(string: String) {
  const strArr = string.split(' ')

  strArr.forEach((word) => {
    word = word.charAt(0).toUpperCase() + word.slice(1)
    console.log(word)
  })

  console.log(strArr)
  return strArr.join(' ')
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
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

    canceled: 'red',
    'on hold': 'red',

    fluency: 'purple',

    feeding: 'pink',
  }

  const color = tags[string]

  return includeBackground
    ? `bg-${color}-100 text-${color}-800` || 'bg-gray-200 text-gray-800'
    : `text-${color}-800`
}

export const currencyFormatter = new Intl.NumberFormat('en-us', {
  style: 'currency',
  currency: 'USD',
})
