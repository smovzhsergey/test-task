import types from './types';

export default Object.freeze({
    getData: () => ({
        type: types.GET_DATA,   
    }),
    getDataSuccess: (data) => ({
        type: types.GET_DATA_SUCCESS,
        payload: data,
    }),
    getDataFail: () => ({
        type: types.GET_DATA_FAIL,
    }),
    startFetching: () => ({
        type: types.START_FETCHING,
    }),
    stopFetching: () => ({
        type: types.STOP_FETCHING,
    }),
    addNewMessage: (message) => ({
        type: types.ADD_NEW_MESSAGE,   
        payload: message,   
    }),
    deleteMessage: (id) => ({
        type: types.DELETE_MESSAGE,
        payload: id,
    }),
    editMessage: (newMessage) => ({
        type: types.EDIT_MESSAGE,
        payload: newMessage,
    }),
    likeMessage: (likes) => ({
        type: types.LIKE_MESSAGE,
        payload: likes,
    }),
});