import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header style={styles.header}>
            <nav style={styles.nav}>
                <ul style={styles.navList}>
                    <li style={styles.navItem}><Link to="/" style={styles.navLink}>Home</Link></li>
                    <li style={styles.navItem}><Link to="/wrestlers" style={styles.navLink}>Wrestlers</Link></li>
                    <li style={styles.navItem}><Link to="/teams" style={styles.navLink}>Teams</Link></li>
                    <li style={styles.navItem}><Link to="/events" style={styles.navLink}>Events</Link></li>
                    <li style={styles.navItem}><Link to="/matches" style={styles.navLink}>Matches</Link></li>
                </ul>
            </nav>
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: '#333',
        padding: '10px 0',
    },
    nav: {
        display: 'flex',
        justifyContent: 'center',
    },
    navList: {
        listStyle: 'none',
        display: 'flex',
        padding: 0,
        margin: 0,
    },
    navItem: {
        margin: '0 15px',
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '18px',
    },
};

export default Header;
