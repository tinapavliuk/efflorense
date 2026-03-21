import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFetchFlowers } from '../../shared/hooks/useFetchFlowers'
import { useCart } from '../../shared/hooks/useCart'
import styles from './Catalog.module.css'

type PriceSort = 'asc' | 'desc'
type FlowerType = 'all' | string

export default function CatalogPage() {
  const { flowers, loading, error } = useFetchFlowers()
  const { addToCart } = useCart()
  const navigate = useNavigate()

  const [openId, setOpenId] = useState<number | null>(null)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(0)

  const [priceSort, setPriceSort] = useState<PriceSort>('asc')
  const [typeFilter, setTypeFilter] = useState<FlowerType>('all')

  const availableTypes = useMemo(() => {
    const set = new Set(flowers.map((f) => f.type))
    return ['all', ...Array.from(set)]
  }, [flowers])

  const selected = useMemo(() => flowers.find((f) => f.id === openId) ?? null, [flowers, openId])

  const visibleFlowers = useMemo(() => {
    const filtered = typeFilter === 'all' ? flowers : flowers.filter((f) => f.type === typeFilter)

    const sorted = [...filtered].sort((a, b) => {
      if (priceSort === 'asc') return a.price - b.price
      return b.price - a.price
    })

    return sorted
  }, [flowers, typeFilter, priceSort])

  const handleOpen = (id: number) => {
    setOpenId(id)
    setQty(1)
    setAdded(0)
  }

  const handleClose = () => {
    setOpenId(null)
  }

  const handleInc = () => setQty((prev) => prev + 1)
  const handleDec = () => setQty((prev) => (prev > 1 ? prev - 1 : 1))

  const handleAdd = () => {
    if (!selected) return

    addToCart({
      flowerId: selected.id,
      name: selected.name,
      image: selected.image,
      price: selected.price,
      quantity: qty,
      kind: 'flower',
    })

    setAdded((prev) => prev + qty)
    setQty(1)
  }

  const goToCart = () => {
    handleClose()
    navigate('/cart')
  }

  if (loading) return <p className={styles.loading}>Loading flowers...</p>
  if (error) return <p className={styles.error}>Error: {error}</p>

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
        <div className={styles.sortGroup} role="group" aria-label="Sort by price">
          <span className={styles.sortLabel}>Sort price:</span>
          <button
            type="button"
            onClick={() => setPriceSort('asc')}
            className={`${styles.sortButton} ${priceSort === 'asc' ? styles.sortButtonActive : ''}`}
          >
            Low → High
          </button>
          <button
            type="button"
            onClick={() => setPriceSort('desc')}
            className={`${styles.sortButton} ${priceSort === 'desc' ? styles.sortButtonActive : ''}`}
          >
            High → Low
          </button>
        </div>

        <div className={styles.sortGroup} role="group" aria-label="Filter by type">
          <span className={styles.sortLabel}>Type:</span>
          {availableTypes.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTypeFilter(t)}
              className={`${styles.sortButton} ${typeFilter === t ? styles.sortButtonActive : ''}`}
            >
              {t === 'all' ? 'All' : t}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.grid}>
        {visibleFlowers.map((f) => (
          <article key={f.id} className={styles.card}>
            <div className={styles.thumb}>
              <img src={f.image} alt={f.name} />
              <button className={styles.thumbButton} type="button" onClick={() => handleOpen(f.id)}>
                Tap
              </button>
            </div>
            <footer className={styles.cardFooter}>
              <span className={styles.cardTitle}>{f.name}</span>
            </footer>
          </article>
        ))}
      </section>

      {openId !== null && selected && (
        <>
          <div className={styles.sheetBackdrop} onClick={handleClose} />
          <aside className={styles.sheet} role="dialog" aria-modal="true">
            <div className={styles.sheetBody}>
              <div className={styles.sheetImage}>
                <img src={selected.image} alt={selected.name} />
                <button className={styles.thumbButton} type="button" onClick={handleClose}>
                  Exit
                </button>
              </div>
              <div className={styles.sheetInfo}>
                <ul className={styles.kv}>
                  <li>
                    <b>Flower:</b>{' '}
                    {(selected.type ?? '').replace(/^./, (c: string) => c.toUpperCase())}
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
                    <button className={styles.step} type="button" onClick={handleDec}>
                      −
                    </button>
                    <span className={styles.qty}>{qty}</span>
                    <button className={styles.step} type="button" onClick={handleInc}>
                      +
                    </button>
                  </div>
                  <button className={styles.primaryButton} type="button" onClick={handleAdd}>
                    Add to bouquet
                  </button>
                  <button type="button" onClick={goToCart} className={styles.toCart}>
                    Go to cart
                  </button>
                </div>
                {added > 0 && (
                  <p className={styles.addedNote}>
                    There are: <b>{added}</b> stems in your bouquet now!
                  </p>
                )}
              </div>
            </div>
          </aside>
        </>
      )}
    </section>
  )
}
