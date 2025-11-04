import { Link } from 'react-router-dom'

import styles from './Register.module.css'

export default function RegisterPage() {
  return (
    <section className={styles.page}>
      <Link to="/" className={styles.logo}>
        E
      </Link>

      <h1 className={styles.title}>Registration</h1>

      <form className={styles.form}>
        <label className={styles.label}>
          <span>Your email*</span>
          <input className={styles.input} type="email" placeholder="Type here" />
        </label>

        <label className={styles.label}>
          <span>Your password*</span>
          <input className={styles.input} type="password" placeholder="Type here" />
        </label>

        <label className={styles.label}>
          <span>Confirm your password*</span>
          <input className={styles.input} type="password" placeholder="Type here" />
        </label>

        <label className={styles.label}>
          <span>Your nickname*</span>
          <input className={styles.input} type="text" placeholder="Type here" />
        </label>

        <label className={styles.label}>
          <span>Your name*</span>
          <input className={styles.input} type="text" placeholder="Type here" />
        </label>

        <label className={styles.label}>
          <span>Your surname</span>
          <input className={styles.input} type="text" placeholder="Type here" />
        </label>

        <label className={styles.label}>
          <span>Your phone number*</span>
          <input className={styles.input} type="tel" placeholder="Type here" />
        </label>

        <button type="button" className={styles.cta}>
          <span className={styles.oval} />
          <span className={styles.strokeA} />
          <span className={styles.strokeB} />
          <span className={styles.ctaLabel}>Create new account</span>
        </button>
      </form>

      <div className={styles.bottom}>
        <div className={styles.note}>Already have an account?</div>
        <Link to="/auth/login" className={styles.smallCta}>
          <span className={styles.smallOval} />
          <span className={styles.smallLabel}>Log in</span>
        </Link>
      </div>
    </section>
  )
}
