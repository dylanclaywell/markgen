import { z } from 'zod'
import * as fs from 'fs'
import path from 'path'

import defaultConfig from './defaultConfig.json'
import { getCliOptions } from './cli'

const cssHexRegex = /^#([0-9a-fA-F]{3}){1,2}$/i

export const Config = z.object({
  colors: z
    .object({
      'primary-10': z.string().regex(cssHexRegex).optional(),
      'primary-20': z.string().regex(cssHexRegex).optional(),
      'primary-30': z.string().regex(cssHexRegex).optional(),
      'primary-40': z.string().regex(cssHexRegex).optional(),
      'primary-50': z.string().regex(cssHexRegex).optional(),
      'secondary-10': z.string().regex(cssHexRegex).optional(),
      'secondary-20': z.string().regex(cssHexRegex).optional(),
      'secondary-30': z.string().regex(cssHexRegex).optional(),
      'secondary-40': z.string().regex(cssHexRegex).optional(),
      'secondary-50': z.string().regex(cssHexRegex).optional(),
      'gray-5': z.string().regex(cssHexRegex).optional(),
      'gray-10': z.string().regex(cssHexRegex).optional(),
      'gray-20': z.string().regex(cssHexRegex).optional(),
      'gray-30': z.string().regex(cssHexRegex).optional(),
      'gray-40': z.string().regex(cssHexRegex).optional(),
      'gray-50': z.string().regex(cssHexRegex).optional(),
      'gray-60': z.string().regex(cssHexRegex).optional(),
      'gray-70': z.string().regex(cssHexRegex).optional(),
      'gray-80': z.string().regex(cssHexRegex).optional(),
      'gray-90': z.string().regex(cssHexRegex).optional(),
    })
    .optional(),
})

function deepMerge(target: any, source: any) {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object)
      Object.assign(source[key], deepMerge(target[key], source[key]))
  }

  Object.assign(target || {}, source)
  return target
}

let config: z.infer<typeof Config>

export function initializeConfig() {
  const userConfig = Config.parse(
    JSON.parse(
      fs.readFileSync(
        path.resolve(__dirname, getCliOptions().in, 'markgen.json'),
        'utf-8',
      ),
    ),
  )

  config = deepMerge(defaultConfig, userConfig)
}

export function getConfig() {
  return config
}
