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
    'src/locales/*/messages.ts',
  ],
})
