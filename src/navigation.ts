import { v4 as generateUuid } from 'uuid'

import { replaceTemplateSlot } from './template'
import navigationTemplate from './templates/navigation.html'
import { PageMap, isPageMap } from './types'
import { capitalizeString } from './utils'

function checkIfShouldBeOpen(pageMap: PageMap, url: string): boolean {
  if (url.split('/').length <= 1) return false

  return Object.keys(pageMap).some((key) => {
    const page = pageMap[key]
    return isPageMap(page) ? checkIfShouldBeOpen(page, url) : page.url === url
  })
}

function createList(pageMap: PageMap, url: string): string[] {
  return Object.keys(pageMap).flatMap((key) => {
    const page = pageMap[key]

    const contentId = generateUuid()

    return isPageMap(page)
      ? `
        <button data-content-id="${contentId}" class='category-button ${
          checkIfShouldBeOpen(pageMap, url) ? 'open' : ''
        }'>
          <span>${capitalizeString(key)}</span> 
          <svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 -960 960 960" width="36">
            <path stroke="currentColor" fill="currentColor" d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
          </svg>
        </button>
        <ul class="category-list ${
          checkIfShouldBeOpen(pageMap, url) ? '' : 'hidden'
        }" id=${contentId}>
        ${createList(page, url)}
        </ul>
      `
      : `<li><a ${page.url === url ? 'class="active"' : ''} href="${
          page.url
        }">${page.title}</a></li>`
  })
}

export function generateNavigation({
  pageMap,
  url,
}: {
  pageMap: PageMap
  url: string
}) {
  return replaceTemplateSlot(
    navigationTemplate,
    createList(pageMap, url).join('\n'),
  )
}
