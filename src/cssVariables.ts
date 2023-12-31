import path from 'path'
import fs from 'fs'

import { replaceTemplateSlots } from './template'
import { getConfig } from './config'
import colorStyles from './assets/colors.css'
import { getCliOptions } from './cli'

export function generateCssVariables() {
  const colors = getConfig().colors ?? {}

  const colorMap = Object.entries(colors).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [`color-${key}`]: value,
    }),
    {},
  )

  const newColorsFile = replaceTemplateSlots(colorStyles.toString(), colorMap)

  const filePath = path.join(
    process.cwd(),
    getCliOptions().output,
    'assets',
    'colors.css',
  )

  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
  }

  fs.writeFileSync(filePath, newColorsFile)
}
