import Link from "next/link";
import styles from "@/components/catalog/catalog.module.css";

export function SiteHeader() {
  return (
    <header className={styles.siteHeader} data-print-hidden>
      <Link className={styles.wordmark} href="/" aria-label="OAT / NIGHT home">
        <span>OAT</span>
        <span aria-hidden="true">/</span>
        <span>NIGHT</span>
      </Link>

      <nav className={styles.siteNav} aria-label="Primary navigation">
        <Link href="/#flavors">Flavors</Link>
        <Link href="/#base">Base</Link>
      </nav>
    </header>
  );
}
