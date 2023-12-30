export type ValueOf<T> = T[keyof T]

export type PageMap = {
  [key: string]:
    | {
        title: string
        url: string
        contents: string
        headings: string[]
      }
    | PageMap
}

export function isPageMap(pageMap: unknown): pageMap is PageMap {
  return (
    typeof pageMap === 'object' && pageMap !== null && !('title' in pageMap)
  )
}
