import { i18n } from '@lingui/core'
import { ensurePrefix } from '@r/shared'
import { useEffect, useState } from 'react'
import getAppConfig from './config'

const defaultStoragePrefix = 'i18n-'

function isSupportedLocale(locale: string) {
  return !!getAppConfig().i18n?.locales?.[locale]
}

function storeLocale(locale: string) {
  localStorage.setItem(ensurePrefix('local', getAppConfig().i18n?.storagePrefix ?? defaultStoragePrefix), locale)
}

function getStoredLocale(defaultLocale?: string) {
  const locale = localStorage.getItem(getAppConfig().i18n?.storagePrefix ?? defaultStoragePrefix)
  if (locale && isSupportedLocale(locale))
    return locale

  return defaultLocale
}

async function loadAndActivate(locale?: string) {
  locale = locale ?? getAppConfig().i18n?.defaultLocale ?? 'zh'
  const data = getAppConfig().i18n?.locales?.[locale]

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
export async function activateLocale(locale?: string) {
  return await loadAndActivate(locale ?? getAppConfig().i18n?.defaultLocale)
}

export async function tryActivateLocale(locale?: string) {
  return await loadAndActivate(locale)
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
