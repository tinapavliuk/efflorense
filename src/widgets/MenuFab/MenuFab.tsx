import { Link, useLocation } from 'react-router-dom'

import styles from './MenuFab.module.css'

const HIDE_PATTERNS = [/^\/$/, /^\/auth(\/|$)/, /^\/menu(\/|$)/]

export default function MenuFab() {
  const { pathname } = useLocation()
  const hidden = HIDE_PATTERNS.some((rx) => rx.test(pathname))
  if (hidden) return null

  return (
    <Link to="/menu" className={styles.btn} aria-label="Open menu">
      Menu
    </Link>
  )
}
