import { Link } from 'react-router-dom'

import styles from './Menu.module.css'

export default function MenuPage() {
  return (
    <section className={styles.page}>
      <img src="/auth-ribbon.webp" alt="" className={styles.ribbon} />

      <h1 className={styles.brand}>Efflorense</h1>
      <Link to="/" className={styles.exit}>
        Exit
      </Link>

      <div className={styles.rail}>
        <div className={styles.railTrack} />
        <ol className={styles.railNums}>
          <li>1</li>
          <li>2</li>
          <li className={styles.active}>3</li>
          <li>4</li>
          <li>5</li>
        </ol>
      </div>
      <nav className={styles.menu}>
        <Link to="/profile" className={styles.item}>
          your profile
        </Link>
        <Link to="/catalog#make" className={styles.item}>
          make a bouquet
        </Link>
        <Link to="/catalog#ready" className={styles.item}>
          buy a ready-made bouquet
        </Link>
        <Link to="/mood" className={styles.item}>
          mood constructor
        </Link>
        <Link to="/#about" className={styles.item}>
          about us
        </Link>
      </nav>
    </section>
  )
}
