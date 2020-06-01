import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../../actions/session_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return action.userInfo.directMessages
        case LOGOUT_CURRENT_USER:
            return {};
        default:
            return state;
    };
};