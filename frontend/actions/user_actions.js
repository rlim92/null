import * as APIUtil from '../utils/user_util';

export const RECEIVE_DMS_MEMBERS = "RECEIVE_DMS_MEMBERS";

const receiveDMsMembers = memberInfo => {
    return {
        type: RECEIVE_DMS_MEMBERS,
        memberInfo,
    }
}

export const fetchDMsMembers = dmIds => {
    return (dispatch) => {
        return APIUtil.fetchDMsMembers(dmIds).then(memberInfo => {
            dispatch(receiveDMsMembers(memberInfo));
        });
    };
};