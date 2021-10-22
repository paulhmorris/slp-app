export function capitalize(string: String) {
  const strArr = string.split(' ')

  strArr.forEach((word) => {
    word = word.charAt(0).toUpperCase() + word.slice(1)
    console.log(word)
  })

  console.log(strArr)
  return strArr.join(' ')
}

export function getTagStyles(tag: String) {
  let styles = ''

  switch (tag.toLowerCase()) {
    case 'new':
      styles = 'bg-blue-100 text-blue-800'
      break

    case 'in progress':
      styles = 'bg-green-100 text-green-800'
      break

    case 'discontinued':
      styles = 'bg-yellow-100 text-yellow-800'
      break

    case 'canceled':
    case 'on hold':
      styles = 'bg-red-100 text-red-800'
      break

    case 'met':
    default:
      styles = 'bg-gray-200 text-gray-800'
  }

  return styles
}
