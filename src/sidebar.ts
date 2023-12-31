import { replaceTemplateSlot } from './template'

import sidebar from './templates/sidebar.html'
import { Heading } from './types'

export function generateSidebar(headings: Heading[], url: string) {
  const list = headings
    .map((heading) => {
      const id = heading.text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, '-')
        .replace(/-{2,}/g, '-')
        .replace(/-$/, '')

      return `<li class="indent-${heading.level}"><a data-hash="#${id}" href="${url}#${id}">${heading.text}</a></li>`
    })
    .join('\n')

  return replaceTemplateSlot(sidebar, list)
}
