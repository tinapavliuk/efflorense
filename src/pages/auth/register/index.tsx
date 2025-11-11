import { Link } from 'react-router-dom'
import styles from '../Auth.module.css'

export default function RegisterPage() {
  return (
    <section className={styles.page}>
      <Link to="/" className={styles.badge}>
        E
      </Link>

      <h1 className={styles.title}>Registration</h1>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <label className={styles.field}>
          <span className={styles.label}>Your email*</span>
          <input className={styles.input} type="email" placeholder="Type here" />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Your password*</span>
          <input className={styles.input} type="password" placeholder="Type here" />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Confirm your password*</span>
          <input className={styles.input} type="password" placeholder="Type here" />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Your nickname*</span>
          <input className={styles.input} type="text" placeholder="Type here" />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Your name*</span>
          <input className={styles.input} type="text" placeholder="Type here" />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Your surname</span>
          <input className={styles.input} type="text" placeholder="Type here" />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Your phone number*</span>
          <input className={styles.input} type="tel" placeholder="Type here" />
        </label>

        <button className={styles.primaryButton} type="submit">
          <span className={styles.primaryButtonOval} />
          <span className={styles.primaryButtonStroke} />
          <span className={styles.primaryButtonLabel}>Create new account</span>
        </button>
      </form>

      <div className={styles.bottom}>
        <p className={styles.note}>Already have an account?</p>
        <Link to="/auth/login" className={styles.secondaryButton}>
          <span className={styles.secondaryButtonOval} />
          <span className={styles.secondaryButtonLabel}>Log in</span>
        </Link>
      </div>
    </section>
  )
}
