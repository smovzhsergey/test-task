import React, { useEffect, useRef, useState }  from 'react';
import { func, object, string } from 'prop-types';
import { FaWindowClose, FaHeart, FaRegHeart, FaEdit, FaSave, FaTrashAlt } from 'react-icons/fa';

import Styles from './message.module.scss';

const Message = ({
	avatar,
	created_at,
	currentUser,
	deleteMessage,
	editMessage,
	id,
	isLikedMessage,
	isMyMessage,
	likeMessage,
	message,
	user
}) => {

	const [ messageText, setMessageText ] = useState(message);
	const [ isEditing, setIsEditing ] = useState(false);
	const inputField = useRef(messageText);

	useEffect( () => {
		if (isEditing) {
			inputField.current.focus();
		}
	}, [isEditing]);

    const handleLikeClick = () => {
        const { likes } = currentUser;
        let newLikes;

        if ( !likes.includes(id) ) {
            newLikes = [ ...likes, id ];
        } else {
            newLikes = likes.filter( item => item !== id );
        }
        
        likeMessage(newLikes);
	}
	
	const handleDelete = (e) => { deleteMessage(id) };
	
	const handleEdit = () => { setIsEditing(!isEditing) };
	
	const handleChange = (e) => { setMessageText(e.target.value) };

	const handleDobleClick = () => {
		if (isMyMessage) {
			handleEdit();
		}
	};

	const cancelEditing = () => {
		handleEdit();
		setMessageText(message);
	};

	const updateMessage = (id) => {
		setIsEditing(!isEditing);

        editMessage({
			id,
			message: messageText
		});
	};

	const handleKeyDown = (e) => {
		if (e.keyCode === 13) {
			updateMessage(id);
		}
		
		if (e.keyCode === 27) {
			cancelEditing();
		}
	}

	const handleUpdate = (e) => { updateMessage(id) };

	const messageType = isMyMessage ? 'myOwnMessage' : 'message';

    const iconLike = !isLikedMessage ?
        <FaRegHeart className = { Styles.icon } data-id = { id } onClick = { handleLikeClick } />
        :
        <FaHeart className = { Styles.icon } data-id = { id } onClick = { handleLikeClick } />;

	const whichIcons = isMyMessage ?
		<>
			{ isEditing && <FaWindowClose className = { Styles.icon } onClick = { cancelEditing }/>}
			{ !isEditing && <FaEdit className = { Styles.icon } onClick = { handleEdit }/>}
			{ isEditing &&  <FaSave className = { Styles.icon } data-id = { id } onClick = { handleUpdate }/>}
			<FaTrashAlt className = { Styles.icon } data-id = { id } onClick = { handleDelete }/>
		</> 
		:
		iconLike;

    return (
		<div className = { Styles[messageType] } data-id = { id } >
            <figure>
                <img src = { avatar } alt = { `User ${ user } avatar` } />
            </figure>
            <div className = { Styles.content }>
                <p className = { Styles.content__author }>{ user }</p>
				<p
					className = { Styles.content__message }
					onDoubleClick = { handleDobleClick }
				>
					{
						!isEditing ?
							message 
							:
							( isMyMessage && <input
									type = 'text'
									ref = { inputField }
									value = { messageText }
									onChange = { handleChange }
									onKeyDown = { handleKeyDown }
								/>
							) 	
					}
				</p>
            </div>
            <span className = { Styles.time }>{ created_at }</span>
            <p className = {Styles.icons} >
                { whichIcons }
            </p>
        </div>
    );
}

Message.propTypes = {
    avatar: string.isRequired,
    created_at: string.isRequired,
    id: string.isRequired,
    message: string.isRequired,
	user: string.isRequired,
	currentUser: object.isRequired,
    deleteMessage: func.isRequired,
    editMessage: func.isRequired,
    likeMessage: func.isRequired,
}

export default Message;