import { program } from 'commander'
import z from 'zod'

const Options = z.object({
  input: z.string(),
  output: z.string(),
})

let cliOptions: z.infer<typeof Options>

export function initializeCliOptions() {
  program
    .option('-i, --input <path>', 'Input directory', 'docs')
    .option('-o, --output <path>', 'Output directory', 'www')
    .parse()
  cliOptions = Options.parse(program.opts())
}

export function getCliOptions() {
  return cliOptions
}
