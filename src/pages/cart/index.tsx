import { Link } from 'react-router-dom'
import { useCart } from '../../shared/hooks/useCart'
import styles from './Cart.module.css'

type PackagingName = 'ribbon packaging' | 'paper packaging' | 'basket packaging'

const PACKAGING_PRICES: Record<PackagingName, number> = {
  'ribbon packaging': 1,
  'paper packaging': 0.7,
  'basket packaging': 2,
}

export default function CartPage() {
  const {
    cart,
    loading,
    error,
    updateQuantity,
    removeFromCart,
    upsertPackaging,
  } = useCart()

  const flowers = cart.filter((item) => item.kind === 'flower')
  const packaging = cart.find((item) => item.kind === 'packaging') ?? null

  const flowersTotal = flowers.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )
  const total = flowersTotal + (packaging ? packaging.price : 0)

  const handleDec = (id: number, current: number) => {
    if (current > 1) {
      updateQuantity(id, current - 1)
    } else {
      removeFromCart(id)
    }
  }

  const handleSelectPackaging = (name: PackagingName, image?: string) => {
    upsertPackaging(name, PACKAGING_PRICES[name], image)
  }

  if (loading) {
    return (
      <section className={styles.page}>
        <h1 className={styles.title}>Shopping cart</h1>
        <p className={styles.managerMessage}>Loading…</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className={styles.page}>
        <h1 className={styles.title}>Shopping cart</h1>
        <p className={styles.managerMessage}>Error: {error}</p>
      </section>
    )
  }

  return (
    <section className={styles.page}>
      <Link to="/" className={styles.badge}>
        E
      </Link>

      <h1 className={styles.title}>Shopping cart</h1>

      {flowers.length === 0 ? (
        <p className={styles.managerMessage}>Your cart is empty yet</p>
      ) : (
        flowers.map((flower) => (
          <div key={flower.id} className={styles.flowerItem}>
            {flower.image ? (
              <img src={flower.image} alt={flower.name} className={styles.flowerImage} />
            ) : (
              <div className={styles.flowerImage} />
            )}

            <h3 className={styles.flowerName}>{flower.name}</h3>

            <div className={styles.priceBlock}>
              <span className={styles.priceText}>
                ${(flower.price * flower.quantity).toFixed(2)}
              </span>
            </div>

            <div className={styles.quantityBlock}>
              <button
                type="button"
                className={styles.qtyBtn}
                onClick={() =>
                  flower.id && handleDec(flower.id, flower.quantity)
                }
              >
                −
              </button>
              <span className={styles.quantityText}>{flower.quantity}</span>
              <button
                type="button"
                className={styles.qtyBtn}
                onClick={() =>
                  flower.id && updateQuantity(flower.id, flower.quantity + 1)
                }
              >
                +
              </button>
            </div>
          </div>
        ))
      )}

      <h2 className={styles.sectionTitle}>Choose type of packaging:</h2>

      <div className={styles.packagingOptions}>
        <button
          type="button"
          className={styles.packagingCard}
          onClick={() => handleSelectPackaging('ribbon packaging', '/cart-ribbon.png')}
        >
          <img src="/cart-ribbon.png" alt="Ribbon packaging" className={styles.packagingImage} />
          <h3 className={styles.packagingName}>ribbon</h3>
          {packaging?.name === 'ribbon packaging' ? (
            <span className={styles.radioSelected} />
          ) : (
            <span className={styles.radio} />
          )}
        </button>

        <button
          type="button"
          className={styles.packagingCard}
          onClick={() => handleSelectPackaging('paper packaging', '/cart-paper.png')}
        >
          <img src="/cart-paper.png" alt="Paper packaging" className={styles.packagingImage} />
          <h3 className={styles.packagingName}>paper</h3>
          {packaging?.name === 'paper packaging' ? (
            <span className={styles.radioSelected} />
          ) : (
            <span className={styles.radio} />
          )}
        </button>

        <button
          type="button"
          className={styles.packagingCard}
          onClick={() => handleSelectPackaging('basket packaging', '/cart-basket.png')}
        >
          <img src="/cart-basket.png" alt="Basket packaging" className={styles.packagingImage} />
          <h3 className={styles.packagingName}>basket</h3>
          {packaging?.name === 'basket packaging' ? (
            <span className={styles.radioSelected} />
          ) : (
            <span className={styles.radio} />
          )}
        </button>
      </div>

      <h2 className={styles.sectionTitle}>Summary:</h2>

      <div className={styles.summaryBlock}>
        {flowers.map((flower) => (
          <div key={flower.id} className={styles.summaryRow}>
            <span className={styles.summaryText}>The flower “{flower.name}”</span>
            <div className={styles.quantityDisplay}>{flower.quantity}</div>
            <div className={styles.priceDisplay}>
              ${(flower.price * flower.quantity).toFixed(2)}
            </div>
          </div>
        ))}

        {packaging && (
          <div className={styles.summaryRow}>
            <span className={styles.summaryText}>{packaging.name}</span>
            <div className={styles.priceDisplay}>
              {packaging.price.toFixed(2)}
            </div>
          </div>
        )}

        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Total sum:</span>
          <div className={styles.totalPrice}>{total.toFixed(2)}</div>
        </div>
      </div>

      <button className={styles.orderButton} type="button">
        Order
      </button>

      <p className={styles.managerMessage}>
        Our manager is going to connect with you about the details!
      </p>
    </section>
  )
}
