import React from 'react';
import { func, object } from 'prop-types';
import moment from 'moment';

import Styles from './newMessage.module.scss';
import { createID } from '../../helpers/helpers';

const NewMessage = ({ addNewMessage, currentUser }) => {

    const handleSubmit = (e) => {

		e.preventDefault();
		const form = e.target;

		const newMessage = {
			id: createID(13),
			user: currentUser.user,
			avatar: currentUser.avatar,
			created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
			message: form[0].value,
		}

		addNewMessage(newMessage);
		form[0].value = '';
	}
	
    return (
        <div className = { Styles.form } >
            <form onSubmit = { handleSubmit }>
                <input type = 'text' placeholder = 'Type something...' />
                <input type = 'submit' value = 'Send' />
            </form>
        </div>
    );
}

NewMessage.propTypes = {
    currentUser: 	object.isRequired,
    addNewMessage:	func.isRequired,
}

export default NewMessage;