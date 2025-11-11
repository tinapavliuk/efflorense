import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import styles from './Catalog.module.css'

type Flower = {
  id: string
  name: string
  type: string
  price: number
  length: number
  colorName: string
  meaning: string
  perfectFor: string
  image: string
}

const data: Flower[] = [
  {
    id: '1',
    name: 'marquise',
    type: 'rose',
    price: 1.5,
    length: 60,
    colorName: 'Passionate red',
    meaning: 'A red rose speaks of deep love and timeless passion.',
    perfectFor: 'someone who makes your heart bloom.',
    image: '/catalog-rose-red.png',
  },
  {
    id: '2',
    name: 'opalisette',
    type: 'rose',
    price: 1.7,
    length: 70,
    colorName: 'Pure white',
    meaning: 'A white rose symbolizes innocence and new beginnings.',
    perfectFor: 'a sincere compliment or celebration.',
    image: '/catalog-rose-white.png',
  },
  {
    id: '3',
    name: 'pallite',
    type: 'tulip',
    price: 2,
    length: 45,
    colorName: 'Soft pink',
    meaning: 'Grace, affection and care.',
    perfectFor: 'a gentle compliment.',
    image: '/catalog-tulip-pink.png',
  },
]

export default function CatalogPage() {
  const [openId, setOpenId] = useState<string | null>(null)
  const selected = useMemo(() => data.find((d) => d.id === openId) ?? null, [openId])

  return (
    <section className={styles.page}>
      <Link to="/" className={styles.badge}>
        E
      </Link>

      <div className={styles.bubbleA} aria-hidden />
      <div className={styles.bubbleB} aria-hidden />

      <header className={styles.hero}>
        <h1 className={styles.title}>Make a bouquet</h1>
        <p className={styles.lead}>
          <span className={styles.accent}>Choose every flower yourself</span> — the color, the
          scent, the <span className={styles.accent}>feeling</span>.
          <br />
          Build a bouquet that’s as unique as your story.
        </p>
        <div className={styles.actionsRow}>
          <Link to="/mood" className={styles.moodButton}>
            <span className={styles.moodButtonInner} />
            <span className={styles.moodButtonLabel}>Mood constructor</span>
          </Link>
          <div className={styles.or}>or</div>
        </div>
        <h2 className={styles.subtitle}>Choose your flower</h2>
      </header>

      <section className={styles.sortBar}>
        <span className={styles.sortLabel}>Sort flowers by:</span>
        <div className={styles.sortGroup} role="group" aria-label="Sorting">
          <button className={`${styles.sortButton} ${styles.sortButtonActive}`} type="button">
            Price
          </button>
          <button className={styles.sortButton} type="button">
            Type
          </button>
        </div>
      </section>

      <section className={styles.grid}>
        {data.map((f) => (
          <article key={f.id} className={styles.card}>
            <div className={styles.thumb}>
              <img src={f.image} alt={f.name} />
              <button className={styles.thumbButton} type="button" onClick={() => setOpenId(f.id)}>
                Tap
              </button>
            </div>
            <footer className={styles.cardFooter}>
              <span className={styles.cardTitle}>{f.name}</span>
            </footer>
          </article>
        ))}
      </section>

      {openId && selected && (
        <>
          <div className={styles.sheetBackdrop} onClick={() => setOpenId(null)} />
          <aside className={styles.sheet} role="dialog" aria-modal="true">
            <div className={styles.sheetBody}>
              <div className={styles.sheetImage}>
                <img src={selected.image} alt={selected.name} />
                <button
                  className={styles.thumbButton}
                  type="button"
                  onClick={() => setOpenId(null)}
                >
                  Exit
                </button>
              </div>
              <div className={styles.sheetInfo}>
                <ul className={styles.kv}>
                  <li>
                    <b>Flower:</b> {(selected.type ?? '').replace(/^./, (c) => c.toUpperCase())}
                  </li>
                  <li>
                    <b>Color:</b> {selected.colorName}
                  </li>
                  <li>
                    <b>Price:</b> ${selected.price} per stem
                  </li>
                  <li>
                    <b>Length:</b> {selected.length} cm
                  </li>
                  <li>
                    <b>Meaning:</b> {selected.meaning}
                  </li>
                  <li>
                    <b>Perfect for:</b> {selected.perfectFor}
                  </li>
                </ul>
                <div className={styles.sheetActions}>
                  <div className={styles.stepper} role="group" aria-label="Amount">
                    <button className={styles.step} type="button">
                      −
                    </button>
                    <span className={styles.qty}>1</span>
                    <button className={styles.step} type="button">
                      +
                    </button>
                  </div>
                  <button className={styles.primaryButton} type="button">
                    Add to bouquet
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </>
      )}
    </section>
  )
}
