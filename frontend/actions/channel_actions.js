import * as APIUtil from '../utils/channel_utils';

export const RECEIVE_SERVER_CHANNELS = "RECEIVE_SERVER_CHANNELS";
export const RECEIVE_ACTIVE_CHANNEL = "RECEIVE_ACTIVE_CHANNEL";

const receiveServerChs = (servChInfo) => {
    return {
        type: RECEIVE_SERVER_CHANNELS,
        servChInfo
    }
}

export const fetchServerChs = serverId => {
    return (dispatch) => {
        return APIUtil.fetchServerChs(serverId).then(servChInfo => {
            dispatch(receiveServerChs(servChInfo));
        });
    };
};