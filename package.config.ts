import { defineConfig } from '@sanity/pkg-utils'

export default defineConfig({
  dist: 'lib',
  tsconfig: 'tsconfig.lib.json',

  extract: {
    rules: {
      'ae-internal-missing-underscore': 'off',
    },
  },
})
