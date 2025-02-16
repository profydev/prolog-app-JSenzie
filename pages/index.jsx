import { Button } from "@features/ui";
import styles from "./index.module.scss";
import { useState } from "react";
import classNames from "classnames";
import Link from "next/link";

const IssuesPage = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className={styles.issuesPage}>
      <header className={styles.header}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/logo-large.svg" alt="Prolog logo" />
        <div className={styles.links}>
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/documentation">Documentation</Link>
          <Link href="/pricing">Pricing</Link>
        </div>

        <a href={"/dashboard"} className={styles.link}>
          <Button>Open Dashboard</Button>
        </a>
        <Button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className={styles.menuButton}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={isMobileMenuOpen ? "/icons/x.png" : "/icons/menu-2.png"}
            alt={isMobileMenuOpen ? "close menu" : "open menu"}
            className={styles.menuIcon}
          />
        </Button>
      </header>
      <div
        className={classNames(
          styles.menuOverlay,
          isMobileMenuOpen && styles.isMobileMenuOpen,
        )}
      />
      <nav
        className={classNames(
          styles.nav,
          isMobileMenuOpen && styles.isMobileMenuOpen,
        )}
      >
        <div className={styles.sideLinks}>
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/documentation">Documentation</Link>
          <Link href="/pricing">Pricing</Link>
        </div>
        <a href={"/dashboard"} className={styles.sideDashboardLink}>
          <Button>Open Dashboard</Button>
        </a>
      </nav>
      <button
        className={styles.contactButton}
        onClick={() =>
          alert(
            "Implement this in Challenge 2 - Modal:\n\nhttps://profy.dev/rjs-challenge-modal",
          )
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/message.svg" alt="Contact" />
      </button>
    </div>
  );
};

export default IssuesPage;
