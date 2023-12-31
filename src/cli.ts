import { program } from 'commander'
import z from 'zod'

const Options = z.object({
  in: z.string(),
  out: z.string(),
})

let cliOptions: z.infer<typeof Options>

export function initializeCliOptions() {
  program
    .option('-i, --in <path>', 'Input directory', 'docs')
    .option('-o, --out <path>', 'Output directory', 'www')
    .parse()
  cliOptions = Options.parse(program.opts())
}

export function getCliOptions() {
  return cliOptions
}
