export function capitalizeSnakeCaseString(str: string) {
  return str
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function capitalizeAndSeparateCamelCaseString(str: string) {
  return str
    .split(/(?=[A-Z])/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function capitalizeKebabCaseString(str: string) {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function capitalizeString(str: string) {
  return capitalizeKebabCaseString(
    capitalizeSnakeCaseString(capitalizeAndSeparateCamelCaseString(str)),
  )
}
