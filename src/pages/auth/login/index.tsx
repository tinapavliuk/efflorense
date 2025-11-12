import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../shared/auth/useAuth'
import styles from '../Auth.module.css'

export default function LoginPage() {
  const { login, loading, error } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    try {
      await login(email, password)
      navigate('/home-after', { replace: true })
    } catch {
    }
  }

  return (
    <section className={styles.page}>
      <Link to="/" className={styles.badge}>
        E
      </Link>

      <h1 className={styles.title}>Log in</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.field}>
          <span className={styles.label}>Your email*</span>
          <input
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Type here"
            type="email"
            required
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Your password*</span>
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type here"
            required
          />
        </label>

        {error ? <p className={styles.error}>{error}</p> : null}

        <button className={styles.primaryButton} type="submit" disabled={loading}>
          <span className={styles.primaryButtonOval} />
          <span className={styles.primaryButtonStroke} />
          <span className={styles.primaryButtonLabel}>
            {loading ? 'Logging in...' : 'Log in'}
          </span>
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
