import { defineConfig } from '@lingui/cli'

export default defineConfig({
  sourceLocale: 'zh',
  locales: [
    'zh',
    'zh-Hant',
    'en',
    'ja',
  ],
  compileNamespace: 'ts',
  catalogs: [
    {
      path: '<rootDir>/apps/web/src/locales/{locale}/messages',
      include: ['<rootDir>/apps/web/src/'],
    },
  ],
})
