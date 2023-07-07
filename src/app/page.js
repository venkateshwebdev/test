import styles from './page.module.css'
export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
      <div className={`${styles.about} ${styles.sub}`}>Image</div>
      <div className={`${styles.loginForm} ${styles.sub}`}>
        <div className={styles.formContainer}></div>
      </div>
      </div>
    </div>
  )
}
