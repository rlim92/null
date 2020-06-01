import { merge } from 'lodash';
import { RECEIVE_SERVER_CHANNELS } from '../../actions/channel_actions';


const channelsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case RECEIVE_SERVER_CHANNELS:
            return action.servChInfo.channels;
        default:
            return state;
    };
};

export default channelsReducer;