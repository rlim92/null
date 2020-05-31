import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../../actions/session_actions';
import { merge } from 'lodash';
import { RECEIVE_SERVER_CHANNELS } from '../../actions/channel_actions';

const serversReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case RECEIVE_SERVER_CHANNELS:
            return merge({}, state, action.servChInfo.server)
        case RECEIVE_CURRENT_USER:
            return action.userInfo.servers
        case LOGOUT_CURRENT_USER:
            return {};
        default:
            return state;
    };
};

export default serversReducer;