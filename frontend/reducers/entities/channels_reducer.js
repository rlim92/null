import { merge } from 'lodash';
import { RECEIVE_SERVER_CHANNELS, RECEIVE_ACTIVE_CHANNEL  } from '../../actions/channel_actions';


const channelsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case RECEIVE_SERVER_CHANNELS:
            debugger;
            return action.servChInfo.channels;
        case RECEIVE_ACTIVE_CHANNEL:
            return {};
        default:
            return state;
    };
};

export default channelsReducer;