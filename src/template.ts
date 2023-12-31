export function replaceTemplateSlot(template: string, value: string) {
  return template.replace(/<TEMPLATE_SLOT\s?\/>/, value)
}

export function replaceTemplateSlots(
  template: string,
  values: Record<string, string>,
) {
  let result = template

  for (const key in values) {
    result = result.replace(
      new RegExp(`<TEMPLATE_SLOT name="${key}"\\s?/>`, 'g'),
      values[key],
    )
  }

  return result
}
