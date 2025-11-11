import { Link } from 'react-router-dom'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <h1 className={styles.title}>404 missed calls</h1>
        <p className={styles.text}>My little flower, why are not you with us?</p>
        <p className={styles.text}>sincerely yours, Tinnie</p>
        <Link to="/" className={styles.link}>
          Back to home
        </Link>
      </div>
    </div>
  )
}
