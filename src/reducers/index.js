import types from '../actions/types';
import { user } from './../helpers/helpers';

const initialState =  {
    currentUser: user,
    data: [],
    isFetching: false,
};

export default function reducer(state = initialState, { type, payload }){
    switch (type){

        case types.START_FETCHING:
            return {
                ...state,
                isFetching: true
            };

        case types.STOP_FETCHING:
            return {
                ...state,
                isFetching: false
            };

        case types.GET_DATA_SUCCESS:
            
            return {
                ...state,
                data: payload,
            };

        case types.ADD_NEW_MESSAGE:
            return {
                ...state,
                data: [ ...state.data, payload ],
            };

        case types.EDIT_MESSAGE:
            const updatedData = state.data.map( item => {
                if (item.id === payload.id) {
                    item.message = payload.message;
                }
                return {
                    ...item,
                }
            });

            return {
                ...state,
                data: updatedData
            };

        case types.LIKE_MESSAGE:
            
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    likes: payload
                },
            };

        case types.DELETE_MESSAGE:
            const data = state.data.filter( message => message.id !== payload);
            return {
                ...state,
                data 
            };

        default:
            return state;
    }
}