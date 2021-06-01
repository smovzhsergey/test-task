import React, {useRef, useEffect} from 'react';
import { arrayOf, func, object, objectOf, string } from 'prop-types';

import Styles from './messageList.module.scss';
import Message from '../Message/Message';

const MessageList = ({ currentUser, deleteMessage, editMessage, likeMessage, messages }) => {
    
    const cont = useRef();

    useEffect( () => {
        cont.current.scrollIntoView({block: "end", behavior: "smooth"});
    }, [messages.length])
    
    const messageList = messages.map( item => {

        const isMyMessage = currentUser.user === item.user;
        const isLikedMessage = currentUser.likes.includes(item.id);

        return (
            <Message
                key = { item.id }
                currentUser = { currentUser }
                isMyMessage = { isMyMessage }
                isLikedMessage = { isLikedMessage }
                { ...item }
                deleteMessage = { deleteMessage }
                editMessage = { editMessage }
                likeMessage = { likeMessage }
            />
        );
    });
    
    return (
        <section className = { Styles.wall } ref = {cont} >
            { messageList }
        </section>
    );
}

MessageList.propTypes = {
    currentUser:    object.isRequired,
    deleteMessage:  func.isRequired,
    editMessage:    func.isRequired,
    likeMessage:    func.isRequired,
    messages:       arrayOf(objectOf(string)).isRequired,
}

export default MessageList;