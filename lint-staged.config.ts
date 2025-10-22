import type { Configuration } from 'lint-staged'

const config: Configuration = {
  'src/**/*.{ts,tsx}': 'biome check --write --no-errors-on-unmatched',
  '.husky/**/*.{js,jsx}': 'biome check --write --no-errors-on-unmatched'
}

export default config
