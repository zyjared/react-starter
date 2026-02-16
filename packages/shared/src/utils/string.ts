export function ensurePrefix(value: string, prefix: string) {
  if (!prefix)
    return value
  return value.startsWith(prefix) ? value : `${prefix}${value}`
}

export function ensureSuffix(value: string, suffix: string) {
  if (!suffix)
    return value
  return value.endsWith(suffix) ? value : `${value}${suffix}`
}
