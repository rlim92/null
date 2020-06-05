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

const receiveDmMsgs = (dmInfo) => {
    return {
        type: RECEIVE_DM_MESSAGES,
        dmInfo
    }
}

export const fetchDmMsgs = (dmId) => {
    return (dispatch) => {
        return APIUtil.fetchDmMsgs(dmId).then(dmInfo => {
            return dispatch(receiveDmMsgs(dmInfo));
        });
    };
};