import { replaceTemplateSlot } from './template'
import navigationTemplate from './templates/navigation.html'
import { PageMap } from './types'

type ValueOf<T> = T[keyof T]

export function generateNavigation({ pages }: { pages: ValueOf<PageMap>[] }) {
  return replaceTemplateSlot(
    navigationTemplate,
    pages
      .map((page) => `<li><a href="${page.url}">${page.title}</a></li>`)
      .join('\n'),
  )
}
