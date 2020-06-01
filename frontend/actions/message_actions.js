import * as APIUtil from '../utils/message_utils';

export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const RECEIVE_DM_MESSAGES = "RECEIVE_DM_MESSAGES";

// export const RECEIVE_CHATROOM_MESSAGES = "RECEIVE_CHATROOM_MESSAGES";

export const receiveMessage = (message) => {
    return {
        type: RECEIVE_MESSAGE,
        message
    };
};

const receiveDmMsgs = (messages) => {
    return {
        type: RECEIVE_DM_MESSAGES,
        messages
    }
}

export const fetchDmMsgs = (dmId) => {
    return (dispatch) => {
        return APIUtil.fetchDmMsgs(dmId).then(messages => {
            return dispatch(receiveDmMsgs(messages));
        });
    };
};