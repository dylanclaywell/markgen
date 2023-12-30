import { v4 as generateUuid } from 'uuid'

import { replaceTemplateSlot, replaceTemplateSlots } from './template'
import navigationTemplate from './templates/navigation.html'
import navigationAccordionTemplate from './templates/navigationAccordion.html'
import navigationLinkTemplate from './templates/navigationLink.html'
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
      ? replaceTemplateSlots(navigationAccordionTemplate, {
          'content-id': contentId,
          'category-button-class': checkIfShouldBeOpen(pageMap, url)
            ? 'open'
            : '',
          category: capitalizeString(key),
          'category-list-class': checkIfShouldBeOpen(pageMap, url)
            ? ''
            : 'hidden',
          'category-list': createList(page, url).join('\n'),
        })
      : replaceTemplateSlots(navigationLinkTemplate, {
          url: page.url,
          title: page.title,
          class: page.url === url ? 'active' : '',
        })
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
