import styles from './navbutton.module.css';

export default function NavButton({ buttonText }) {
    return (
      <div className={styles.navbutton}>
        {buttonText}
      </div>
    );
  }