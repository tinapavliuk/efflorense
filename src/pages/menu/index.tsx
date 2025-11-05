import { Link } from 'react-router-dom'
import styles from './Menu.module.css'

export default function MenuPage() {
  return (
    <section className={styles.page}>
      <img src="/auth-ribbon.webp" alt="" className={styles.bg} />

      <Link to="/" className={styles.badge}>
        E
      </Link>

      <Link to="/home-after" className={styles.exit}>
        Exit
      </Link>

      <aside className={styles.rail}>
        <div className={styles.railTrack} />
        <ol className={styles.railNums}>
          <li className={styles.active}>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
        </ol>
      </aside>

      <div className={styles.content}>
        <h1 className={styles.brand}>Efflorense</h1>

        <nav className={styles.menu}>
          <Link to="/home-after" className={styles.item}>
            homepage
          </Link>
          <Link to="/catalog" className={styles.item}>
            make a bouquet
          </Link>
          <Link to="/mood" className={styles.item}>
            mood constructor
          </Link>
          <Link to="/about" className={styles.item}>
            about us
          </Link>
          <Link to="/profile" className={styles.item}>
            your profile
          </Link>
        </nav>
      </div>
    </section>
  )
}
