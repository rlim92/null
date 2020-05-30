import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../../actions/session_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return merge({}, action.userInfo.friends, { [action.userInfo.currentUser.id]: action.userInfo.currentUser });
        case LOGOUT_CURRENT_USER:
            return {};
        default:
            return state;
    };
};