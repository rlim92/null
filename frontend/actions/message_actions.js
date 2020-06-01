// import * as APIUtil from '../utils/message_utils';

export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
// export const RECEIVE_CHATROOM_MESSAGES = "RECEIVE_CHATROOM_MESSAGES";

export const receiveMessage = (message) => {
    return {
        type: RECEIVE_MESSAGE,
        message
    };
};
