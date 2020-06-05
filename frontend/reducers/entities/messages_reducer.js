import { merge } from 'lodash';
import { RECEIVE_MESSAGE, RECEIVE_DM_MESSAGES } from '../../actions/message_actions';
import { RECEIVE_CHANNEL_INFO } from '../../actions/channel_actions';
import { RECEIVE_USER_DMS } from '../../actions/dm_actions';


export default (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case RECEIVE_MESSAGE:
            return merge({}, state, action.message);
        case RECEIVE_CHANNEL_INFO:
            if (!action.channelInfo.messages) return {};

            return action.channelInfo.messages;
        case RECEIVE_DM_MESSAGES:
            return action.dmInfo.messages;
        case RECEIVE_USER_DMS:
            if (!action.messages) return {};

            return action.messages;
        default:
            return state;
    };
};