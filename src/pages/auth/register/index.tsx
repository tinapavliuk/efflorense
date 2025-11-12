import { FormEvent, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../shared/auth/AuthContext'
import styles from '../Auth.module.css'

export default function RegisterPage() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [nickname, setNickname] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [phone, setPhone] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)

  if (!auth) return null

  const { register, loading, error } = auth

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setLocalError('Please fill required fields.')
      return
    }

    if (password !== confirm) {
      setLocalError('Passwords do not match.')
      return
    }
    setLocalError(null)

    try {
      await register(email, password, name || nickname, phone)
      navigate('/home-after', { replace: true })
    } catch {}
  }

  return (
    <section className={styles.page}>
      <Link to="/" className={styles.badge}>
        E
      </Link>

      <h1 className={styles.title}>Registration</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.field}>
          <span className={styles.label}>Your email*</span>
          <input
            className={styles.input}
            type="email"
            placeholder="Type here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Your password*</span>
          <input
            className={styles.input}
            type="password"
            placeholder="Type here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Confirm your password*</span>
          <input
            className={styles.input}
            type="password"
            placeholder="Type here"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Your nickname</span>
          <input
            className={styles.input}
            type="text"
            placeholder="Type here"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Your name</span>
          <input
            className={styles.input}
            type="text"
            placeholder="Type here"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Your surname</span>
          <input
            className={styles.input}
            type="text"
            placeholder="Type here"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Your phone number</span>
          <input
            className={styles.input}
            type="tel"
            placeholder="Type here"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>

        {(localError || error) && <p className={styles.error}>{localError || error}</p>}

        <button className={styles.primaryButton} type="submit" disabled={loading}>
          <span className={styles.primaryButtonOval} />
          <span className={styles.primaryButtonStroke} />
          <span className={styles.primaryButtonLabel}>
            {loading ? 'Creating…' : 'Create new account'}
          </span>
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
