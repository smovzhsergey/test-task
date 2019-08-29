import React, { useState }  from 'react';
import { func, object, string } from 'prop-types';
import { FaHeart, FaRegHeart, FaEdit, FaSave, FaTrashAlt } from 'react-icons/fa';

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

    const handleLikeClick = (e) => {
        const id = e.currentTarget.dataset.id;
        const { likes } = currentUser;
        let newLikes;

        if ( !likes.includes(id) ) {
            newLikes = [ ...likes, id ];
        } else {
            newLikes = likes.filter( item => item !== id );
        }
        
        likeMessage(newLikes);
	}
	
	const handleDelete = (e) => {
		const id = e.currentTarget.dataset.id;
		
        deleteMessage(id);
	}
	
	const handleEdit = () => {
		setIsEditing(!isEditing);
	}
	
	const handleChange = (e) => {
		setMessageText(e.target.value)
	}
	
	const handleUpdate = (e) => {
		const id = e.currentTarget.dataset.id;
		setIsEditing(!isEditing);

        editMessage({
			id,
			message: messageText
		});
	}
	
	const messageType = isMyMessage ? 'myOwnMessage' : 'message';

    const iconLike = !isLikedMessage ?
        <FaRegHeart className = { Styles.icon } data-id = { id } onClick = { handleLikeClick } />
        :
        <FaHeart className = { Styles.icon } data-id = { id } onClick = { handleLikeClick } />;

	const whichIcons = isMyMessage ?
		<>
			{ !isEditing && <FaEdit className = { Styles.icon } data-id = { id } onClick = { handleEdit }/>}
			{ isEditing &&  <FaSave className = { Styles.icon } data-id = { id } onClick = { handleUpdate }/>}
			<FaTrashAlt className = { Styles.icon } data-id = { id } onClick = { handleDelete }/>
		</> 
		:
		iconLike;

    return (
        <div className = { Styles[messageType] } data-id = {id}>
            <figure>
                <img src = { avatar } alt = { `User ${ user } avatar` } />
            </figure>
            <div className = { Styles.content }>
                <p className = { Styles.content__author }>{ user }</p>
				<p className = { Styles.content__message }>
					{
						!isEditing ?
							message 
							:
							<input type = 'text' value = { messageText } onChange = { handleChange } />
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