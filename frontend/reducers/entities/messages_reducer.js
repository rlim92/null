import { RECEIVE_MESSAGE } from '../../actions/message_actions';
import { RECEIVE_CHANNEL_INFO } from '../../actions/channel_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case RECEIVE_MESSAGE:
            return merge({}, state, action.message);
        case RECEIVE_CHANNEL_INFO:
            if (!action.channelInfo.messages) {
                return {};
            }
            return action.channelInfo.messages;
        default:
            return state;
    };
};