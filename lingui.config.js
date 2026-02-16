import { defineConfig } from '@lingui/cli'

export default defineConfig({
  sourceLocale: 'zh',
  locales: [
    'zh-CN',
    'en-US',
  ],
  compileNamespace: 'ts',
  catalogs: [
    {
      path: '<rootDir>/apps/web/src/i18n/locales/{locale}/messages',
      include: ['<rootDir>/apps/web/src/'],
    },
  ],
})
