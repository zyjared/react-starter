import type { Messages } from '@lingui/core'
import { i18n } from '@lingui/core'
import { useEffect, useState } from 'react'
import config from './i18n-locales'

interface LocaleData {
  local: string
  text: string
  messages?: Messages
}

interface DefineLocalesOptions<D> {
  /**
   * 默认语言，不指定时为首个语言
   */
  locale?: D
  /**
   * localStorage 的键
   */
  storageKey?: string
}

export function defineLocales<const T extends readonly LocaleData[], D extends T[number]['local']>(
  locales: T,
  options: DefineLocalesOptions<D> = {},
) {
  const {
    locale,
    storageKey = 'i18n-locale',
  } = options

  return {
    locales,
    locale: (locale ?? locales[0].local) as D,
    storageKey,
  }
}

type SupportedLocale = (typeof config.locales)[number]['local']

export const LOCALES = config.locales

function isSupportedLocale(locale: string): locale is SupportedLocale {
  return config.locales.some(item => item.local === locale)
}

function storeLocale(locale: string) {
  localStorage.setItem(config.storageKey, locale)
}

function getStoredLocale(defaultLocale?: SupportedLocale) {
  const locale = localStorage.getItem(config.storageKey)
  if (locale && isSupportedLocale(locale))
    return locale

  return defaultLocale
}

async function loadAndActivate(locale: SupportedLocale) {
  const data = config.locales.find(item => item.local === locale) as LocaleData | undefined

  if (!data) {
    console.warn(`Locale ${locale} not found in config`)
    return
  }

  let messages = data?.messages
  if (!messages) {
    const catalog = await import(`./locales/${locale}/messages.po`)
    messages = catalog?.messages
  }

  if (!messages) {
    console.warn(`Failed to load messages for locale ${locale}`)
    return
  }

  i18n.loadAndActivate({
    locale,
    messages,
  })

  storeLocale(locale)
}

/**
 * 激活指定的语言
 */
export async function activateLocale(locale?: SupportedLocale) {
  return await loadAndActivate(locale ?? config.locale)
}

export async function tryActivateLocale(locale?: string) {
  return await loadAndActivate(locale as SupportedLocale)
}

/**
 * 中文为默认语言，不需要再请求资源
 */
export function useI18nReady() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const locale = getStoredLocale()

    activateLocale(locale).finally(() => {
      setReady(true)
    })
  }, [])

  return ready
}
