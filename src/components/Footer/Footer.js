import React from 'react';
import Styles from './footer.module.scss';

const Footer = () => (
    <footer className = { Styles.footer } >
        <nav>
            <span>Home</span>
            <span>About</span>
            <span>Contact Us</span>
        </nav>
        <p>@ Copyright 2019</p>
    </footer>
);

export default Footer;