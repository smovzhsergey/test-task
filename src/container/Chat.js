import React, { Component } from 'react';
import { arrayOf, bool, func, object, objectOf, string } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions';

import Header from './../components/Header/Header';
import Spinner from './../components/Spinner/Spinner';
import Footer from './../components/Footer/Footer';
import NewMessage from './../components/NewMessage/NewMessage';
import MessageList from './../components/MessageList/MessageList';

class Chat extends Component {

    static propTypes = {
        actions:		objectOf(func).isRequired,
        currentUser:	object.isRequired,
        data:			arrayOf(objectOf(string)).isRequired,
        isFetching:		bool.isRequired,
    }

    componentDidMount () {
		this.props.actions.getData();
    }

    getDataForHeader = () => {
        const { data } = this.props;

        if (!data.length) { 
			return null; 
		}

        const users = data.map( item => item.user );

        const numberOfUsers = [ ...new Set(users) ];
        
        const time = data[data.length-1].created_at;

        return {
            numberOfUsers: numberOfUsers.length,
            numberOfMessages: data.length,
            lastMessageTime: time,
        }
    }

    render () {

        const { 
			actions: {
				addNewMessage,
				deleteMessage,
				likeMessage,
				editMessage,
			},
			currentUser,
			data,
			isFetching
		} = this.props;
		
		const dataForHeader = this.getDataForHeader();
		
        return (
			
			!isFetching && data.length ?
                (
					<section>
						<Header { ...dataForHeader } />
						<MessageList
							currentUser = { currentUser }
							messages = { data }
							deleteMessage = { deleteMessage }
							editMessage = { editMessage }
							likeMessage = { likeMessage }
						/>
						<NewMessage currentUser = { currentUser } addNewMessage = { addNewMessage } />
						<Footer />
                    </section>
				)
                : 
                <Spinner />
                
            
        );
    }
}

const mapStateToProps = ( state ) => ({
	currentUser:	state.currentUser,
	data:			state.data,
	isFetching: 	state.isFetching,
});

const mapDispatchToProps = ( dispatch ) => ({
    actions: bindActionCreators({...actions}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat) ;