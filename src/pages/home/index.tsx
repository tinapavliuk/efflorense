import styles from './HomeBefore.module.css'

export default function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.overlay} />
        <div className={styles.center}>
          <div className={styles.brandBox}>
            <h1 className={styles.brand}>Efflorense</h1>
          </div>

          <p className={styles.subtitle}>It’s a place where your floral dreams come true</p>

          <div className={styles.actions}>
            <a href="/auth/register" className={styles.cta}>
              <span className={styles.oval} />
              <span className={styles.label}>Registration</span>
            </a>
            <a href="/auth/login" className={styles.cta}>
              <span className={styles.oval} />
              <span className={styles.label}>Log in</span>
            </a>
          </div>

          <div className={styles.location}>Location: Pretty girls avenue, 33</div>
        </div>
      </section>

      <section className={styles.about}>
        <h2 className={styles.aboutTitle}>About us</h2>
        <div className={styles.aboutRow}>
          <div className={styles.aboutTextBox}>
            <div className={styles.aboutLeadWord}>efflorense</div>
            <p className={styles.aboutText}>
              is more than a flower brand – it’s a world where every bloom has a soul and every
              bouquet tells a story.
            </p>
          </div>
          <div className={styles.aboutImage} />
        </div>
        <div className={styles.aboutRow}>
          <div className={styles.aboutPhotoL} />
          <div className={styles.aboutColR}>
            <p className={styles.aboutParagraph}>
              We blend natural beauty with modern design aesthetics to create floral compositions
              that speak the language of emotions. Each arrangement isn’t just a gift it’s a
              message:
            </p>
            <div className={styles.aboutQuote}>“I feel. I care. I love.”</div>
          </div>
        </div>

        <div className={styles.aboutRow}>
          <div className={styles.aboutColL}>
            <div className={styles.aboutLeadWord}>efflorense</div>
            <p className={styles.aboutTextSmall}>
              is where nature meets emotion,
              <br />
              where design meets feeling,
              <br />
              where flowers come alive.
            </p>
          </div>
          <div className={styles.aboutPhotoR} />
        </div>
      </section>

      <section className={styles.creator}>
        <h2 className={styles.creatorTitle}>Our creator</h2>

        <div className={styles.creatorRow}>
          <div className={styles.creatorPhoto} />

          <div className={styles.creatorRight}>
            <div className={styles.creatorName}>Tina Pavliuk</div>

            <div className={styles.creatorCard}>
              <p className={styles.creatorText}>
                –It all <strong>began with a single flower</strong> — a rose pressed between the
                pages of a sketchbook. What started as a fascination with colors, petals, and the
                quiet poetry of nature slowly grew into something more: a desire to capture feelings
                through flowers. – <strong>says Tina.</strong>
              </p>

              <p className={styles.creatorText}>
                <strong>The founder of efflorense</strong> believed that beauty should not only be
                seen but felt. Every petal, every shade of pink or beige, carried its own{' '}
                <strong>emotion</strong> — love, peace, tenderness, gratitude.
              </p>

              <p className={styles.creatorText}>
                So the idea was born: to create a space where people could express emotions not with
                words, but through the language of blooms.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
