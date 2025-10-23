import styles from './HomeAfter.module.css'

export default function HomeAfterPage() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />

      <button className={styles.menuChip}>Menu</button>

      <div className={styles.center}>
        <div className={styles.brandBox}>
          <h1 className={styles.brand}>Efflorense</h1>
        </div>

        <p className={styles.subtitle}>It’s a place where your floral dreams come true</p>

        <div className={styles.actions}>
          <a href="#" className={styles.cta}>
            <span className={styles.oval} />
            <span className={styles.label}>Make a bouquet</span>
          </a>
          <a href="#" className={styles.cta}>
            <span className={styles.oval} />
            <span className={styles.label}>Order a ready-made</span>
          </a>
        </div>

        <div className={styles.inlineNote}>online</div>

        <div className={styles.orShop}>or shop in</div>

        <div className={styles.location}>Location: Pretty girls avenue, 33</div>
      </div>
    </section>
  )
}
