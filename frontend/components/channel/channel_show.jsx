import React from 'react';
import { connect } from 'react-redux';
import Chatroom from '../messages/chatroom';
import { fetchChannelInfo } from '../../actions/channel_actions';
import { receiveMessage } from '../../actions/message_actions';


const mSTP = (state, ownProps) => {
    // debugger;
    const channel = state.entities.channels[ownProps.match.params.channelId];
    const server = state.entities.servers[ownProps.match.params.serverId]
    const currentUserId = state.session.id;
    // debugger;
    const messages = Object.values(state.entities.messages);
    const members = state.entities.users;

    return {
        channel,
        server,
        messages,
        members,
        currentUserId,
        chatType: "ChannelChat"
    }
}

const mDTP = (dispatch, ownProps) => {
    return {
        fetchChatroomInfo: () => dispatch(fetchChannelInfo(ownProps.match.params.channelId)),
        receiveMessage: (message) => dispatch(receiveMessage(message))
    }
}

export default connect(mSTP, mDTP)(Chatroom);