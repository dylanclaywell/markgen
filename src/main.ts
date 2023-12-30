import marked from 'marked'
import * as path from 'path'
import * as fs from 'fs'

import { generateNavigation } from './navigation'
import { PageMap, ValueOf, isPageMap } from './types'
import { replaceTemplateSlots } from './template'
import indexTemplate from './templates/index.html'
import { generateSidebar } from './sidebar'

const isDev = process.env.NODE_ENV === 'development'

function customHeadingId(url: string) {
  return {
    renderer: {
      heading(text: string, level: number) {
        const id = text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]/g, '-')
          .replace(/-{2,}/g, '-')
          .replace(/-$/, '')

        return `<h${level} id="${id}"><a href="${url}#${id}">${text}</a></h${level}>\n`
      },
    },
  }
}

function createFiles(pageMap: PageMap, globalPageMap: PageMap) {
  for (const page of Object.values(pageMap)) {
    if (isPageMap(page)) {
      return createFiles(page, globalPageMap)
    }

    const html = replaceTemplateSlots(indexTemplate, {
      title: page.title,
      navigation: generateNavigation({
        pageMap: globalPageMap,
        url: page.url,
      }),
      sidebar: generateSidebar(page.headings, page.url),
      main: page.contents,
      base: isDev ? path.resolve(__dirname, 'www') : '/',
    })

    const filePath = path.join(__dirname, 'www', page.url)

    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true })
    }

    fs.writeFileSync(filePath, html)
  }
}

function set(
  obj: Record<string, unknown>,
  filePath: string,
  value: ValueOf<PageMap>,
) {
  let schema = obj
  const pathList = filePath.split('/')
  const pathListLength = pathList.length
  for (let i = 0; i < pathListLength - 1; i++) {
    const elem = pathList[i]
    if (!schema[elem]) schema[elem] = {}
    // @ts-ignore
    schema = schema[elem]
  }

  schema[pathList[pathListLength - 1]] = value
}

function parseFrontMatter(file: string) {
  const frontMatter: Record<string, unknown> = {}
  const lines = file.split('\n')

  let index = 0

  // check if file has front matter
  if (!lines[0].startsWith('---')) return { frontMatter, contents: file }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith('---') && i !== 0) {
      index = i + 1
      break
    } else if (line.startsWith('---')) {
      continue
    }

    const [key, value] = line.split(':')
    frontMatter[key] = value.trim()
  }

  return {
    frontMatter,
    contents: lines.slice(index).join('\n'),
  }
}

const pageMap: PageMap = {}

async function parse(docs: string[]) {
  for (const doc of docs) {
    const filePath = path.join(__dirname, 'docs', doc)

    // check if is directory
    if (fs.lstatSync(filePath).isDirectory()) {
      parse(fs.readdirSync(filePath).map((file) => path.join(doc, file)))
      continue
    }

    // check if is markdown file
    if (path.extname(doc) !== '.md') {
      // skip for now
      continue
    }

    const file = fs.readFileSync(filePath, 'utf8')

    const { contents, frontMatter } = parseFrontMatter(file)

    if (!contents) continue

    const headings: string[] = []
    const url = doc.replace('.md', '.html')

    marked.use(customHeadingId(url))
    const html = await marked.parse(contents, {
      walkTokens: (token) => {
        if (token.type === 'heading') {
          headings.push(token.text)
          token.text = 'hello'
        }
      },
    })

    set(pageMap, doc, {
      title: frontMatter.title as string,
      url,
      contents: html,
      headings,
    })
  }

  createFiles(pageMap, JSON.parse(JSON.stringify(pageMap)))
}

// recursively copy files from assets to www
function copyAssets(dir: string) {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stats = fs.statSync(filePath)

    if (stats.isDirectory()) {
      copyAssets(filePath)
      continue
    }

    const dest = path.join(__dirname, 'www', filePath.replace(__dirname, ''))

    if (!fs.existsSync(path.dirname(dest))) {
      fs.mkdirSync(path.dirname(dest), { recursive: true })
    }

    fs.copyFileSync(filePath, dest)
  }
}

copyAssets(path.join(__dirname, 'assets'))

const docs = fs.readdirSync(path.join(__dirname, 'docs'))

parse(docs)
