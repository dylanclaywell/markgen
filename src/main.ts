import marked from 'marked'
import * as path from 'path'
import * as fs from 'fs'
import { generateNavigation } from './navigation'
import { PageMap } from './types'
import { replaceTemplateSlots } from './template'
import indexTemplate from './templates/index.html'

const docs = fs.readdirSync(path.join(__dirname, 'docs'))

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

async function parse() {
  for (const doc of docs) {
    const file = fs.readFileSync(path.join(__dirname, 'docs', doc), 'utf8')

    // check if is directory
    if (fs.lstatSync(path.join(__dirname, 'docs', doc)).isDirectory()) {
      // skip for now
      continue
    }

    // check if is markdown file
    if (path.extname(doc) !== '.md') {
      // skip for now
      continue
    }

    const { contents, frontMatter } = parseFrontMatter(file)

    if (!contents) continue

    const html = await marked.parse(contents)

    pageMap[doc] = {
      title: frontMatter.title as string,
      url: path.basename(doc, '.md') + '.html',
      contents: html,
    }
  }

  generateNavigation({ pages: Object.values(pageMap) })

  for (const page of Object.values(pageMap)) {
    const html = replaceTemplateSlots(indexTemplate, {
      title: page.title,
      navigation: generateNavigation({ pages: Object.values(pageMap) }),
      main: page.contents,
    })

    fs.writeFileSync(path.join(__dirname, 'www', page.url), html)
  }
}

parse()
