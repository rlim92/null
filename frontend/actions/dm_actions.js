import * as APIUtil from '../utils/dm_utils';

export const RECEIVE_USER_DMS = "RECEIVE_USER_DMS";

const receiveUserDms = (userDmInfo) => {
    return {
        type: RECEIVE_USER_DMS,
        userDmInfo
    }
}

export const fetchUserDms = (userId) => {
    return (dispatch) => {
        return APIUtil.fetchUserDms(userId).then(userDmInfo => {
            return dispatch(receiveUserDms(userDmInfo));
        });
    };
};