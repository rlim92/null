import { merge } from 'lodash';
import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../../actions/session_actions';
import { RECEIVE_CHANNEL_INFO } from '../../actions/channel_actions';
import { RECEIVE_USER_DMS } from '../../actions/dm_actions';

export default (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return merge({}, action.userInfo.friends, { [action.userInfo.currentUser.id]: action.userInfo.currentUser });
        case LOGOUT_CURRENT_USER:
            return {};
        case RECEIVE_CHANNEL_INFO:
            const chInfo = action.channelInfo;
            newState = {};
            newState[chInfo.currentUserId] = state[chInfo.currentUserId];

            return merge({}, newState, chInfo.members)
        case RECEIVE_USER_DMS:
            const { userDmInfo } = action;
            newState = {};
            newState[userDmInfo.currentUserId] = state[userDmInfo.currentUserId];

            return merge({}, newState, userDmInfo.members)
        default:
            return state;
    };
};