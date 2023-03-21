import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import NavBar from "./navbar";
import Profile from "../components/profile";
import React from "react";

export const siteTitle = "Personal CRM";

export default function Layout({ children, userContext, props }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Personal CRM" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        Personal CRM
        {userContext.user ? (
          <a href="/api/auth/logout" className={styles.login}>
            Logout
          </a>
        ) : (
          <a href="/api/auth/login" className={styles.log}>
            Login
          </a>
        )}
      </header>
      {
        <>
          <NavBar userContext={userContext} />
          <main>{children}</main>
        </>
      }
      <footer className={styles.footer}>Goodbye world</footer>
    </div>
  );
}
