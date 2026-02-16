import { ensurePrefix } from '@r/shared'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { createContext, use, useEffect, useState } from 'react'
import { cn } from '../lib/utils'

export type Theme = 'dark' | 'light' | 'system'
export type Palette = 'default'
  | 'aurora'
  | 'cedar'
  | 'forest'
  | 'glacier'
  | 'ink'
  | 'lumina'
  | 'rosedawn'
  | 'sunset'

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  defaultPalette?: Palette
  storageKey?: string
}

interface ThemeProviderState {
  theme: Theme
  setTheme: (theme: Theme) => void
  palette: Palette
  setPalette: (palette: Palette) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
  palette: 'default',
  setPalette: () => null,
}

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  defaultPalette = 'default',
  storageKey = 'ui-theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(ensurePrefix('theme', storageKey)) as Theme) || defaultTheme,
  )

  const [palette, setPalette] = useState<Palette>(
    () => (localStorage.getItem(ensurePrefix('palette', storageKey)) as Palette) || defaultPalette,
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  useEffect(() => {
    const root = window.document.documentElement
    const rms = Array.from(root.classList).filter(className => className.startsWith('theme-'))

    root.classList.remove(...rms)

    if (palette !== 'default')
      root.classList.add(ensurePrefix(palette, 'theme-'))
  }, [palette])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(ensurePrefix('theme', storageKey), theme)
      setTheme(theme)
    },
    palette,
    setPalette: (palette: Palette) => {
      localStorage.setItem(ensurePrefix('palette', storageKey), palette)
      setPalette(palette)
    },
  }

  return (
    <ThemeProviderContext value={value}>
      {children}
    </ThemeProviderContext>
  )
}

export function useTheme() {
  const context = use(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-full"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" x2="12" y1="1" y2="3" />
      <line x1="12" x2="12" y1="21" y2="23" />
      <line x1="4.22" x2="5.64" y1="4.22" y2="5.64" />
      <line x1="18.36" x2="19.78" y1="18.36" y2="19.78" />
      <line x1="1" x2="3" y1="12" y2="12" />
      <line x1="21" x2="23" y1="12" y2="12" />
      <line x1="4.22" x2="5.64" y1="19.78" y2="18.36" />
      <line x1="18.36" x2="19.78" y1="5.64" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-full"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export interface ThemeToggleProps {
  'className'?: string
  'aria-label'?: string
  'size'?: 'sm' | 'md' | 'lg'
  'icons'?: { on: React.ReactNode, off: React.ReactNode }
}

export function ThemeToggle({
  className,
  'aria-label': ariaLabel,
  size = 'sm',
  icons = { on: <SunIcon />, off: <MoonIcon /> },
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'
  const shouldReduceMotion = useReducedMotion()

  const handleClick = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  const sizeClasses: Record<NonNullable<ThemeToggleProps['size']>, string> = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel ?? 'Toggle theme'}
      className={cn(
        'inline-flex items-center justify-center rounded-full',
        sizeClasses[size],
        className,
      )}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={isDark ? 'dark' : 'light'}
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.8, rotate: isDark ? -90 : 90 }
          }
          animate={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 1, scale: 1, rotate: 0 }
          }
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.8, rotate: isDark ? 90 : -90 }
          }
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.18, ease: 'easeOut' }}
          className="flex size-full items-center justify-center"
        >
          {isDark ? icons.off : icons.on}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
