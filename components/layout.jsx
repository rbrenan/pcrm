import Head from "next/head";
import styles from "./layout.module.css";
import NavBar from "./navbar";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/material/Menu";
import Link from "next/link";
import Paper from "@mui/material/Paper";

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
      {/*<header className={styles.header}>*/}
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Link href="/" passHref>
            <Button color="inherit">Home</Button>
          </Link>
          <Link href="/people" passHref>
            <Button color="inherit">People</Button>
          </Link>
          <Link href="/companies" passHref>
            <Button color="inherit">Companies</Button>
          </Link>
          <Link href="/interactions" passHref>
            <Button color="inherit">Interactions</Button>
          </Link>
          <Link href="/admin" passHref>
            <Button color="inherit">Admin</Button>
          </Link>
          {/*<NavBar userContext={userContext} />
                  Personal CRM
                  {userContext.user ? (
                    <a href="/api/auth/logout" className={styles.login}>
                      Logout
                    </a>
                  ) : (
                    <a href="/api/auth/login" className={styles.log}>
                      Login
                    </a>
                  )*/}
        </Toolbar>
      </AppBar>
      {/*</header>*/}
      {
        <>
          <main>
            <Paper elevation={5}>{children}</Paper>
          </main>
        </>
      }
    </div>
  );
}
