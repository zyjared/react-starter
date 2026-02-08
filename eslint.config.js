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
}, {
  files: ['apps/web/src/features/**/*.{ts,tsx}'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@/layout/**', '@/router/**'],
            message: 'Feature 不允许依赖 layout/router；请依赖 shared/ui 或其他 Feature 的公共入口。',
          },
        ],
      },
    ],
  },
})
