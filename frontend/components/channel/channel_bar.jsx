import React from 'react';
import { connect } from 'react-redux';
import { fetchServerChs } from '../../actions/channel_actions';
import { Link } from 'react-router-dom';

class ChannelBar extends React.Component {
    constructor(props) {
        super(props);
        
        this.mapChs = this.mapChs.bind(this);
    }

    componentDidMount() {
        const { match, fetchServerChs } = this.props;

        fetchServerChs(match.params.serverId);
    }

    componentDidUpdate(prevProps) {
        const { match, fetchServerChs } = this.props;
        if (match.params.serverId !== prevProps.match.params.serverId) {
            fetchServerChs(match.params.serverId);
        }
    }

    mapChs() {
        const { server, channels } = this.props;

        const textChs = channels.map( (ch, idx) => {
            return (
                <Link to={`/channels/${server.id}/${ch.id}`} key={`ch-${idx}`} className="link ch-link">
                    <div className={`ch-hashtag-div`}>#</div>
                    <div className="ch-name-div">
                        {ch.name}
                    </div>
                </Link >
            )
        })

        return textChs;
    }

    render() {
        const { server, channels } = this.props;
        if (!channels.length || channels[0].serverId !== server.id) return (<div className="channel-bar-div"></div>);
        return (
            <div className="channel-bar-div">
                <div className="channel-bar-server-header">
                    <div className="channel-bar-server-name">
                        {server.name}
                    </div>
                    <img src="https://image.flaticon.com/icons/svg/748/748063.svg" 
                        className="down-arrow-icon"
                    />
                </div>
                <div className="dm-border-div"></div>
                <div className="text-chs-div">
                    <img src="https://image.flaticon.com/icons/svg/748/748063.svg" 
                        className="mini-down-arrow-icon" 
                    />
                    <div className="text-channels-header">Text Channels</div>
                </div>
                {this.mapChs()}
            </div>
        );
    }
}

const mSTP = (state, ownProps) => {
    const server = state.entities.servers[ownProps.match.params.serverId]
    const channels = Object.values(state.entities.channels)
    return {
        server,
        channels
    }
}

const mDTP = dispatch => {
    return {
        fetchServerChs: serverId => dispatch(fetchServerChs(serverId))
    }
}

export default connect(mSTP, mDTP)(ChannelBar);