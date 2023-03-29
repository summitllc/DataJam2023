import Image from 'next/image'
import styles from './page.module.css'


export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Hello World</h1>
      <div className={styles.center}>
        <Image
            className={styles.logo}
            src="/construction.png"
            alt="under construction image"
            width={600}
            height={600}
            priority
        />
      </div>
      <p>We're hard at work churning through data for DATA JAM 2023</p>
    </main>
  )
}
