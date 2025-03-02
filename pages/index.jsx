import { Button } from "@features/ui";
import styles from "./index.module.scss";
import { useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import { useGetContent } from "./api/use-get-content";

const IssuesPage = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data } = useGetContent();

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

      <main>
        {data && (
          <div>
            <div className={styles.contentHead}>
              <div>
                {data && <h1>{data.meta.title}</h1>}
                <p>{data.sections[0].subtitle}</p>
              </div>
              <div className={styles.imageWrapper}>
                <img
                  src={
                    "https://prolog-api.profy.dev" + data.sections[0].image.src
                  }
                />
              </div>
            </div>
            <div className={styles.socialProofSection}>
              <div>
                <p>{data.sections[1].title}</p>
                <div className={styles.socialProofs}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {data.sections[1].companies.map((item) => (
                    <img
                      key={item.name}
                      src={"https://prolog-api.profy.dev" + item.logo}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.testimonialSection}>
              <div className={styles.testimonialTitles}>
                <h1>{data.sections[2].title}</h1>
                <p>{data.sections[2].subtitle}</p>
              </div>
              <div className={styles.testimonials}>
                {data.sections[2].testimonials.map((item) => (
                  <div key={item.userName} className={styles.testimonialCard}>
                    <div>
                      <h3 className={styles.testimonialTitle}>{item.title}</h3>
                      <p className={styles.testimonialText}>{item.text}</p>
                    </div>
                    <div className={styles.testimonialUser}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={
                          "https://prolog-api.profy.dev" + item.userImage.src
                        }
                      />
                      <div>
                        <h3>{item.userName}</h3>
                        <p>
                          {item.userRole}, {item.userCompany}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

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
