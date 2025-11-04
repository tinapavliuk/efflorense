import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Mood.module.css'

type MoodPoint = {
  name: string
  left: number
  top: number
}

const MOODS: MoodPoint[] = [
  { name: 'Tenderness', left: 200, top: 0 },
  { name: 'Passion', left: 75, top: 145 },
  { name: 'Friendship', left: 405, top: 113 },
  { name: 'Kinship', left: 826, top: 113 },
  { name: 'Majesty', left: 1022, top: 0 },
  { name: 'Respect', left: 1146, top: 145 },
  { name: 'Love', left: 609, top: 255 },
  { name: 'Sincerity', left: 200, top: 304 },
  { name: 'Care', left: 1022, top: 304 },
  { name: 'Hope', left: 405, top: 444 },
  { name: 'Optimism', left: 826, top: 444 },
  { name: 'Peace', left: 609, top: 584 },
]

export default function MoodConstructor() {
  const [selected, setSelected] = useState<string[]>([])

  const toggleMood = (mood: string) => {
    if (selected.includes(mood)) {
      setSelected((prev) => prev.filter((m) => m !== mood))
      return
    }
    if (selected.length < 3) {
      setSelected((prev) => [...prev, mood])
    }
  }

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.badge}>
        E
      </Link>

      <div className={styles.bubbleA} aria-hidden />
      <div className={styles.bubbleB} aria-hidden />

      <header className={styles.header}>
        <h1 className={styles.title}>Mood constructor</h1>
        <p className={styles.text}>Select your mood, and let the flowers do the talking.</p>
        <p className={styles.text}>
          Because emotions deserve to <span className={styles.textAccent}>bloom beautifully.</span>
        </p>
        <div className={styles.or}>or</div>
        <Link to="/catalog" className={styles.primaryBtn}>
          Make a bouquet
        </Link>
      </header>

      <section className={styles.mood}>
        <h2 className={styles.moodTitle}>Choose your mood</h2>
        <div className={styles.moodCanvas}>
          {MOODS.map((mood) => {
            const isActive = selected.includes(mood.name)
            const isDisabled = selected.length >= 3 && !isActive
            return (
              <button
                key={mood.name}
                type="button"
                className={`${styles.moodBtn} ${isActive ? styles.moodBtnActive : ''} ${
                  isDisabled ? styles.moodBtnDisabled : ''
                }`}
                style={{ left: mood.left, top: mood.top }}
                onClick={() => toggleMood(mood.name)}
                disabled={isDisabled}
              >
                {mood.name}
              </button>
            )
          })}
        </div>
      </section>

      <section className={styles.footer}>
        <div className={styles.counter}>Selected: {selected.length}/3</div>
        <button type="button" className={styles.confirmBtn} disabled={selected.length === 0}>
          Confirm
        </button>
      </section>
    </div>
  )
}
