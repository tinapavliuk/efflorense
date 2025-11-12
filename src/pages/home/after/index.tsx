import { Link } from 'react-router-dom'
import styles from './HomeAfter.module.css'

export default function HomeAfterPage() {
  return (
    <section className={styles.page}>
      <div className={styles.overlay} />

      <Link to="/" className={styles.badge}>
        E
      </Link>

      <div className={styles.center}>
        <div className={styles.brandBox}>
          <h1 className={styles.brand}>Efflorense</h1>
        </div>

        <p className={styles.subtitle}>It’s a place where your floral dreams come true</p>

        <div className={styles.actions}>
          <Link to="/catalog" className={styles.cta}>
            <span className={styles.ctaOval} />
            <span className={styles.ctaLabel}>Make a bouquet</span>
          </Link>
          <Link to="/mood" className={styles.cta}>
            <span className={styles.ctaOval} />
            <span className={styles.ctaLabel}>Mood constructor</span>
          </Link>
        </div>

        <div className={styles.inlineNote}>online</div>
        <div className={styles.orShop}>or shop in</div>
        <div className={styles.location}>Location: Pretty girls avenue, 33</div>
      </div>
    </section>
  )
}
