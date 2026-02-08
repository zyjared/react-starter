import { messages as zhMessages } from '@/locales/zh/messages'
import { defineLocales } from './i18n'

export default defineLocales([
  {
    local: 'zh',
    text: '中文',
    messages: zhMessages,
  },
  {
    local: 'en',
    text: 'English',
  },
])
