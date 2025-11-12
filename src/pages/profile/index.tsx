import { useAuth } from '../../shared/auth/useAuth'
import { Link } from 'react-router-dom'
import styles from './Profile.module.css'

export default function ProfilePage() {
  const { user, logout } = useAuth()

  return (
    <section className={styles.page}>
      <Link to="/home-after" className={styles.badge}>
        E
      </Link>

      <h1 className={styles.title}>Your profile</h1>

      <div className={styles.card}>
        <div className={styles.row}>
          <span className={styles.label}>Name</span>
          <span className={styles.value}>{user?.name || 'no name yet'}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Email</span>
          <span className={styles.value}>{user?.email}</span>
        </div>
        <div className={styles.row}>
  <span className={styles.label}>Phone</span>
  <span className={styles.value}>{user?.phone || 'no phone yet'}</span>
</div>


        <div className={styles.subblock}>
          <h2 className={styles.subtitle}>Delivery info</h2>
          <p className={styles.text}>
            Here will be your delivery address and favorite packaging!
          </p>
        </div>

        <button type="button" className={styles.logout} onClick={logout}>
          Log out
        </button>
      </div>
    </section>
  )
}
