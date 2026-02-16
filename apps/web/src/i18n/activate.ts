import type { Messages } from '@lingui/core'
import type { LocaleCode } from '@/config'
import { i18n } from '@lingui/core'
import { useEffect, useState } from 'react'
import { getAppConfig } from '@/config'
import { messages } from './locales/zh-CN/messages'

const LOADED_LOCALES: Partial<Record<LocaleCode, Messages>> = {
  'zh-CN': messages,
}

const {
  locales,
  defaultLocale,
  storageKey = 'i18n-locale',
} = getAppConfig().i18n || {}

function findLocale(code: string) {
  return locales?.find(it => it.code === code)
}

async function loadAndActivate(code: string, messages?: Messages) {
  const locale = findLocale(code)

  if (!locale) {
    console.warn(`Locale ${code} not found in config`)
    return
  }

  let msgs = messages
  if (!msgs) {
    const catalog = await import(`./locales/${code}/messages.po`)
    msgs = (catalog as { messages?: Messages })?.messages
  }

  if (!msgs) {
    console.warn(`Failed to load messages for locale ${code}`, locale.label)
    return
  }

  i18n.loadAndActivate({
    locale: code,
    messages: msgs,
  })

  localStorage.setItem(storageKey, code)
}

export async function activateLocale(code = defaultLocale) {
  // 未启用
  if (!code) {
    return
  }

  return await loadAndActivate(code, LOADED_LOCALES[code])
}

export async function tryActivateLocale(code?: string) {
  try {
    await activateLocale(code as LocaleCode)
  }
  catch (e) {
    console.warn(`Failed to activate locale ${code}`, e)
  }
}

export function useI18nReady() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const locale = localStorage.getItem(storageKey) || defaultLocale

    activateLocale(locale as LocaleCode).finally(() => {
      setReady(true)
    })
  }, [])

  return ready
}
