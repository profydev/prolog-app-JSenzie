import React from "react";
import styles from "./page-container.module.scss";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.footerInner}>
          <div className={styles.version}>Version: 14.5.1</div>
          <div className={styles.footerLinks}>
            <Link className={styles.footerLink} href={"#"}>
              Docs
            </Link>
            <Link className={styles.footerLink} href={"#"}>
              API
            </Link>
            <Link className={styles.footerLink} href={"#"}>
              Help
            </Link>
            <Link className={styles.footerLink} href={"#"}>
              Community
            </Link>
          </div>
          <img className={styles.logoIcon} src="/icons/logo-small.svg" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
