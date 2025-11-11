import { Link } from 'react-router-dom'
import styles from './Cart.module.css'

export default function CartPage() {
  return (
    <section className={styles.page}>
      <Link to="/" className={styles.badge}>
        E
      </Link>

      <h1 className={styles.title}>Shopping cart</h1>

      <div className={styles.flowerItem}>
        <img src="/catalog-rose-red.png" alt="Marquise rose" className={styles.flowerImage} />

        <h3 className={styles.flowerName}>marquise</h3>

        <div className={styles.priceBlock}>
          <span className={styles.priceText}>$1,5</span>
        </div>

        <div className={styles.quantityBlock}>
          <span className={styles.quantityText}>+ 1 -</span>
        </div>
      </div>

      <h2 className={styles.sectionTitle}>Choose type of packaging:</h2>

      <div className={styles.packagingOptions}>
        <div className={styles.packagingCard}>
          <img src="/cart-ribbon.png" alt="Ribbon packaging" className={styles.packagingImage} />
          <h3 className={styles.packagingName}>ribbon</h3>
          <svg className={styles.radioSelected} width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="19" fill="#684B39" stroke="#684B39" strokeWidth="2" />
            <circle cx="20" cy="20" r="8" fill="#FDE4D1" />
          </svg>
        </div>

        <div className={styles.packagingCard}>
          <img src="/cart-paper.png" alt="Paper packaging" className={styles.packagingImage} />
          <h3 className={styles.packagingName}>paper</h3>
          <svg className={styles.radio} width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="19" fill="#FDE4D1" stroke="#FDE4D1" strokeWidth="2" />
          </svg>
        </div>

        <div className={styles.packagingCard}>
          <img src="/cart-basket.png" alt="Basket packaging" className={styles.packagingImage} />
          <h3 className={styles.packagingName}>basket</h3>
          <svg className={styles.radio} width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="19" fill="#FDE4D1" stroke="#FDE4D1" strokeWidth="2" />
          </svg>
        </div>
      </div>

      <h2 className={styles.sectionTitle}>Summary:</h2>

      <div className={styles.summaryBlock}>
        <div className={styles.summaryRow}>
          <span className={styles.summaryText}>The rose "Marquise"</span>
          <div className={styles.quantityDisplay}>1</div>
          <div className={styles.priceDisplay}>$1,5</div>
        </div>

        <div className={styles.summaryRow}>
          <span className={styles.summaryText}>The ribbon packaging</span>
          <div className={styles.priceDisplay}>$1</div>
        </div>

        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Total sum:</span>
          <div className={styles.totalPrice}>$2,5</div>
        </div>
      </div>

      <button className={styles.orderButton}>Order</button>

      <p className={styles.managerMessage}>
        Our manager is going to connect with you about the details!
      </p>
    </section>
  )
}
