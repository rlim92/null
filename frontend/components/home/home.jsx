import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Elements from '../ui/loading';
import SideBar from './sidebar';
import ActiveBar from './activebar';
import ChannelChatRoom from '../channel/channel_show';
import DmChatRoom from '../direct_message/dm_show';
import { fetchCurrentUser } from '../../actions/session_actions';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { sessionId, fetchCurrentUser, needPull, location } = this.props;

        if (needPull) {
            fetchCurrentUser(sessionId);
            if (location.pathname === "/") {
                this.props.history.push('/@me');
            }
        } else {
            this.props.history.push('/@me');
        }
    }

    render() {
        const { needPull, loading } = this.props;

        if (needPull || loading) return (
            <div className="home-div">
                <div className="sidebar-div"></div>
                <div className="activebar-div"></div>
                <Elements />
            </div>
        );

        return (
            <div className="home-div">
                <SideBar />
                <ActiveBar />
                <Switch>
                    <Route path="/channels/:serverId/:channelId" component={ChannelChatRoom}/>
                    <Route path="/@me/dms/:dmId" component={DmChatRoom} />
                    <Route path="/@me" component={Elements} />
                </Switch>
            </div>
        )
    }
}

const mSTP = state => {
    return {
        sessionId: state.session.id,
        needPull: state.session.needPull,
        loading: state.ui.loading
    }
}

const mDTP = dispatch => {
    return {
        fetchCurrentUser: (userId) => dispatch(fetchCurrentUser(userId))
    }
}

export default connect(mSTP, mDTP)(Home);