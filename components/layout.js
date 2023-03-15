import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import NavBar from './navbar';

export const siteTitle = 'Personal CRM';

export default function Layout({ children, userContext }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Personal CRM"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        Personal CRM
      </header>
      <NavBar userContext={userContext}/>
      <main>{children}</main>
      <footer className={styles.footer}>Goodbye world</footer>
    </div>
  );
}