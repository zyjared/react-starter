import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  vue: false,
  typescript: true,
  rules: {
    // Disable for shadcn/ui standard: components can export variants/constants
    'react-refresh/only-export-components': 'off',
    // 'eslint-comments/no-unlimited-disable': 'off',
    'pnpm/yaml-enforce-settings': 'off',

  },
  ignores: [
    'apps/web/src/locales/*/messages.ts',
    'apps/web/public/**/*',
    'packages/ui/src/components/ai-elements/**/*.{ts,tsx}',
    'packages/ui/src/components/animate-ui/**/*.{ts,tsx}',
  ],
}, {
  files: ['apps/web/src/**/*.{ts,tsx}'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@/features/*/*'],
            message: '禁止跨 Feature 深层导入，请改用公共入口：@/features/<feature>',
          },
        ],
      },
    ],
  },
})
