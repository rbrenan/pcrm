import styles from "./navbar.module.css";
import NavButton from "./navbutton";
import Link from "next/link";
import React from "react";

export default function NavBar() {
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
      <Link href="/interactions">
        <NavButton buttonText={"Interactions"} />
      </Link>
      <Link href="/admin">
        <NavButton buttonText={"Admin"} />
      </Link>
    </div>
  );
}
