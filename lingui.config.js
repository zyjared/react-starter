import { defineConfig } from '@lingui/cli'

export default defineConfig({
  sourceLocale: 'zh',
  locales: ['zh', 'en'],
  compileNamespace: 'ts',
  catalogs: [
    {
      path: '<rootDir>/packages/locale/web/{locale}/messages',
      include: ['apps/web'],
    },
  ],
})
