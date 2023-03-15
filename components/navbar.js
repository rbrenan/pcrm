import styles from './navbar.module.css';
import NavButton from './navbutton';

export default function NavBar({ children, userContext }) {
    return (
      <div className={styles.bar}>
        <NavButton buttonText={"Home"} />
        <NavButton buttonText={"People"} />
        <NavButton buttonText={"Companies"} />
        {userContext.user ? <a href="/api/auth/logout" className={styles.login}>Logout</a> : <a href="/api/auth/login" className={styles.log}>Login</a>}
      </div>
    );
  }