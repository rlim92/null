import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../../actions/session_actions';
import { merge } from 'lodash';
// import { } from '../actions/user_actions';
// import { } from '../actions/channel_actions';

export default (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return action.userInfo.servers
        case LOGOUT_CURRENT_USER:
            return {};
        default:
            return state;
    };
};