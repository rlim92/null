import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import SideBar from './sidebar';
import ActiveBar from './activebar';
import ChannelChatRoom from '../channel/channel_show';
import { fetchCurrentUser } from '../../actions/session_actions';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { sessionId, fetchCurrentUser, needPull } = this.props;

        if (needPull) {
            fetchCurrentUser(sessionId).then(() => {
                this.props.history.push('/@me');
            });
        } else {
            this.props.history.push('/@me')
        }
    }

    render() {
        if (this.props.needPull) return null;
        return (
            <div className="home-div">
                <SideBar />
                <ActiveBar />
                <Switch>
                    <Route path="/channels/:serverId/:channelId" component={ChannelChatRoom}/>
                </Switch>
            </div>
        )
    }
}

const mSTP = state => {
    return {
        sessionId: state.session.id,
        needPull: state.session.needPull
    }
}

const mDTP = dispatch => {
    return {
        fetchCurrentUser: (userId) => dispatch(fetchCurrentUser(userId))
    }
}

export default connect(mSTP, mDTP)(Home);