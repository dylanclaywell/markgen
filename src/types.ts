export type ValueOf<T> = T[keyof T]

export type Heading = {
  level: number
  text: string
}

export type PageMap = {
  [key: string]:
    | {
        link: boolean
        title: string
        url: string
        contents: string
        headings: Heading[]
      }
    | PageMap
}

export function isPageMap(pageMap: unknown): pageMap is PageMap {
  return typeof pageMap === 'object' && pageMap !== null && !('link' in pageMap)
}
