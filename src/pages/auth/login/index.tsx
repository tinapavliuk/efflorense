import { Link } from 'react-router-dom'

import styles from './Login.module.css'

export default function LoginPage() {
  return (
    <section className={styles.wrap}>
      <img src="/auth-ribbon.webp" alt="" className={styles.ribbon} />
      <a href="/" className={styles.badge}>
        E
      </a>

      <h1 className={styles.title}>Log in</h1>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <label className={styles.label}>Your email or nickname*</label>
        <input className={styles.input} placeholder="Type here" />

        <label className={styles.label}>Your password*</label>
        <input className={styles.input} type="password" placeholder="Type here" />

        <label className={styles.label}>Confirm your password*</label>
        <input className={styles.input} type="password" placeholder="Type here" />

        <button className={styles.cta}>
          <span className={styles.oval} />
          <span className={styles.ovalStroke} />
          <span className={styles.ctaLabel}>Log in</span>
        </button>
      </form>

      <div className={styles.bottom}>
        <div className={styles.question}>Don’t have an account?</div>
        <Link to="/auth/register" className={styles.linkBtn}>
          <span className={styles.linkOval} />
          <span className={styles.linkLabel}>Registration</span>
        </Link>
      </div>
    </section>
  )
}
