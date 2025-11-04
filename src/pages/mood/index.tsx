import styles from './Mood.module.css'

const moods = [
  'Tenderness',
  'Majesty',
  'Passion',
  'Friendship',
  'Kinship',
  'Respect',
  'Sincerety',
  'Love',
  'Care',
  'Hope',
  'Optimism',
  'Peace',
]

export default function MoodPage() {
  return (
    <section className={styles.page}>
      <span className={`${styles.bubble} ${styles.bTopLeft}`} />
      <span className={`${styles.bubble} ${styles.bTopRight}`} />
      <span className={`${styles.bubble} ${styles.bMidLeft}`} />
      <span className={`${styles.bubble} ${styles.bMidRight}`} />
      <span className={`${styles.bubble} ${styles.bCenter}`} />

      <a href="/" className={styles.badge}>
        E
      </a>
      <a href="/" className={styles.menu}>
        Menu
      </a>

      <h1 className={styles.title}>Mood constructor</h1>

      <p className={styles.lead}>Select your mood, and let the flowers do the talking.</p>
      <p className={styles.lead}>
        Because emotions deserve to <span className={styles.scripty}>bloom beautifully</span>.
      </p>

      <div className={styles.or}>or</div>

      <a href="/catalog" className={styles.cta} onClick={(e) => e.preventDefault()}>
        <span className={styles.oval} />
        <span className={styles.stroke} />
        <span className={styles.ctaLabel}>Make a bouquet</span>
      </a>

      <h2 className={styles.subtitle}>Choose your mood</h2>

      <div className={styles.heart}>
        {moods.map((m) => (
          <a key={m} href="#" className={styles.pill} onClick={(e) => e.preventDefault()}>
            <span className={styles.pillBg} />
            <span className={styles.pillText}>{m}</span>
          </a>
        ))}
      </div>

      <a href="#" className={styles.confirm} onClick={(e) => e.preventDefault()}>
        <span className={styles.confirmOval} />
        <span className={styles.confirmStroke} />
        <span className={styles.confirmLabel}>Confirm</span>
      </a>
    </section>
  )
}
