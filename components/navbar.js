import styles from "./navbar.module.css";
import NavButton from "./navbutton";
import Link from "next/link";
import React from "react";

export default function NavBar({ children, userContext }) {
  return (
    <div className={styles.bar}>
      <Link href="/">
        <NavButton buttonText={"Home"} />
      </Link>
      <Link href="/people">
        <NavButton buttonText={"People"} />
      </Link>
      <Link href="/companies">
        <NavButton buttonText={"Companies"} />
      </Link>
    </div>
  );
}
