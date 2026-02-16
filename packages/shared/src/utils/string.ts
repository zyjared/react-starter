export function ensurePrefix(value: string, prefix: string): string {
  return value.startsWith(prefix) ? value : `${prefix}${value}`
}

export function ensureSuffix(value: string, suffix: string): string {
  return value.endsWith(suffix) ? value : `${value}${suffix}`
}
