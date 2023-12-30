import { replaceTemplateSlot } from './template'

import sidebar from './templates/sidebar.html'

export function generateSidebar(headings: string[], url: string) {
  const list = headings
    .map((heading) => {
      const id = heading
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, '-')
        .replace(/-{2,}/g, '-')
        .replace(/-$/, '')

      return `<li><a href="${url}#${id}">${heading}</a></li>`
    })
    .join('\n')

  return replaceTemplateSlot(sidebar, list)
}
