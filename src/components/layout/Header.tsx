import Link from 'next/link';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        Structura
      </Link>
      <nav className={styles.nav}>
        <Link href="/challenges" className={styles.navLink}>
          Challenges
        </Link>
      </nav>
    </header>
  );
}
