import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    const scrollUp = () => {
      window.scrollTo(0, 0)
      const main = document.querySelector('main')
      if (main) {
        main.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      }
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }

    scrollUp()
    requestAnimationFrame(scrollUp)
    const t = setTimeout(scrollUp, 100)

    return () => clearTimeout(t)
  }, [pathname])

  return null
}
