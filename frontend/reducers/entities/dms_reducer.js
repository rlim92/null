import { LOGOUT_CURRENT_USER } from '../../actions/session_actions';
import { RECEIVE_USER_DMS } from '../../actions/dm_actions';

export default (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case RECEIVE_USER_DMS:
            return action.userDmInfo.directMessages;
        case LOGOUT_CURRENT_USER:
            return {};
        default:
            return state;
    };
};