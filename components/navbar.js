import styles from './navbar.module.css';
import NavButton from './navbutton';

export default function NavBar({ children }) {
    return (
      <div className={styles.bar}>
        <NavButton buttonText={"Home"} />
        <NavButton buttonText={"People"} />
        <NavButton buttonText={"Companies"} />
      </div>
    );
  }