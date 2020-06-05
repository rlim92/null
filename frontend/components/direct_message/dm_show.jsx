import React from 'react';
import { connect } from 'react-redux';
import Chatroom from '../messages/chatroom';
import { receiveMessage, fetchDmMsgs } from '../../actions/message_actions';


const mSTP = (state, ownProps) => {
    const dm = state.entities.directMessages[ownProps.match.params.dmId];
    const currentUserId = state.session.id;
    const messages = Object.values(state.entities.messages);
    const members = {};

    if (dm) {
        dm.memberIds.forEach(dmId => {
            members[dmId] = state.entities.users[dmId];
        });
    }

    return {
        dm,
        messages,
        members,
        currentUserId,
        chatType: "DmChat",
    }
}

const mDTP = (dispatch, ownProps) => {
    return {
        fetchChatroomInfo: () => dispatch(fetchDmMsgs(ownProps.match.params.dmId)),
        receiveMessage: (message) => dispatch(receiveMessage(message)),
    }
}

export default connect(mSTP, mDTP)(Chatroom);