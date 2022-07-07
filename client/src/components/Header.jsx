import styles from '../styles/Header.module.css';

function Header() {
    return (
        <div class={styles.Header}>
            <h1 class={styles.brand}>Sample<span>Hub</span></h1>
        </div>
    );
}

export default Header;