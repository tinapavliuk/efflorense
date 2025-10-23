import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={`${styles.circle} ${styles.c1}`} />
      <span className={`${styles.circle} ${styles.c2}`} />
      <span className={`${styles.circle} ${styles.c3}`} />

      <h3 className={styles.title}>Let moments bloom.</h3>

      <div className={styles.brandBox}>
        <div className={styles.brand}>Efflorense</div>
      </div>
    </footer>
  )
}
