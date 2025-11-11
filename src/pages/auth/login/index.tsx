import { Link } from 'react-router-dom'
import styles from '../Auth.module.css'

export default function LoginPage() {
  return (
    <section className={styles.page}>
      <Link to="/" className={styles.badge}>
        E
      </Link>

      <h1 className={styles.title}>Log in</h1>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <label className={styles.field}>
          <span className={styles.label}>Your email or nickname*</span>
          <input className={styles.input} placeholder="Type here" />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Your password*</span>
          <input className={styles.input} type="password" placeholder="Type here" />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Confirm your password*</span>
          <input className={styles.input} type="password" placeholder="Type here" />
        </label>

        <button className={styles.primaryButton} type="submit">
          <span className={styles.primaryButtonOval} />
          <span className={styles.primaryButtonStroke} />
          <span className={styles.primaryButtonLabel}>Log in</span>
        </button>
      </form>

      <div className={styles.bottom}>
        <p className={styles.note}>Don’t have an account?</p>
        <Link to="/auth/register" className={styles.secondaryButton}>
          <span className={styles.secondaryButtonOval} />
          <span className={styles.secondaryButtonLabel}>Registration</span>
        </Link>
      </div>
    </section>
  )
}
