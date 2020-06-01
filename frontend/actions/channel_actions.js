import * as APIUtil from '../utils/channel_utils';

export const RECEIVE_SERVER_CHANNELS = "RECEIVE_SERVER_CHANNELS";
export const RECEIVE_CHANNEL_INFO = "RECEIVE_CHANNEL_INFO";

const receiveServerChs = (servChInfo) => {
    return {
        type: RECEIVE_SERVER_CHANNELS,
        servChInfo
    }
}

const receiveChannelInfo = (channelInfo) => {
    return {
        type: RECEIVE_CHANNEL_INFO,
        channelInfo
    }
}


export const fetchServerChs = (serverId) => {
    return (dispatch) => {
        return APIUtil.fetchServerChs(serverId).then(servChInfo => {
            return dispatch(receiveServerChs(servChInfo));
        });
    };
};

export const fetchChannelInfo = (channelId) => {
    return (dispatch) => {
        return APIUtil.fetchChannelInfo(channelId).then(
            channelInfo => dispatch(receiveChannelInfo(channelInfo))
        )
    };
};