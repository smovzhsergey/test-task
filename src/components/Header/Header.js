import React from 'react';
import { number, string } from 'prop-types';
import moment from 'moment';

import Styles from './header.module.scss';

const Header = ({ lastMessageTime, numberOfMessages, numberOfUsers }) => {
    
    const time = moment(lastMessageTime).format("YYYY-MM/DD hh:mm:ss");

    return (
        <header className = { Styles.header } >
            <h1>My CHAT</h1>
            <p>{ numberOfUsers } users</p>
            <p>{ numberOfMessages } messages</p>
            <p>Last message: { time }</p>
        </header>
    );
}

Header.propTypes = {
    lastMessageTime:	string.isRequired,
    numberOfMessages:	number.isRequired,
    numberOfUsers:		number.isRequired,
}

export default Header;