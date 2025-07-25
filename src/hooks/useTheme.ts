import { useEffect } from 'react'
import { useLocalStorage, useMedia } from 'react-use'

type Theme = 'light' | 'dark'

export function useTheme() {
  const prefersDark = useMedia('(prefers-color-scheme: dark)')
  const [theme, setTheme] = useLocalStorage<Theme>('theme', prefersDark ? 'dark' : 'light')

  useEffect(() => {
    const root = document.documentElement
    
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return {
    theme: theme || 'light',
    setTheme,
    toggleTheme,
    isDark: theme === 'dark'
  }
}