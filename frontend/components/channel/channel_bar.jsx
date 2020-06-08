import React from 'react';
import { connect } from 'react-redux';
import { fetchServerChs } from '../../actions/channel_actions';
import { Link } from 'react-router-dom';
// import { handleBlur } from '../../utils/channel_utils';

class ChannelBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { dropdown: "hidden" };

        this.chHeaderDiv = React.createRef();
        this.dropdownDiv = React.createRef();
        
        this.mapChs = this.mapChs.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
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

    handleBlur(e) {
        if (document.hasFocus()) {
            const relatedTarget = e.relatedTarget;
        
            if (e.target !== relatedTarget && !e.target.contains(relatedTarget)) {
                this.setState({ dropdown: "hidden" });
            }
        }
    }

    handleClick(e) {
        e.stopPropagation();

        const what = this.state.dropdown === "hidden" ? "" : "hidden";
        this.setState({ dropdown: what });
    }

    toggleDropdown() {
        const { dropdown } = this.state;
        return (
            <div 
                className={`dropdown-div ${dropdown}`} 
                tabIndex="1"
                onClick={(e) => e.stopPropagation()}
                onBlur={this.handleBlur}
            >
                <ul>
                    <li 
                        className="dropdown-li" 
                        onClick={()=> console.log("1")}
                    >
                        Server Settings
                    </li>
                    <li 
                        className="dropdown-li"
                        onClick={() => console.log("2")}
                    >
                        Create Channel
                    </li>
                    <li 
                        className="dropdown-li"
                        onClick={() => console.log("3")}
                    >
                        Change Nickname
                    </li>
                </ul>
            </div>
        )
    }

    render() {
        const { server, channels } = this.props;
        const active = this.state.dropdown === "hidden" ? "" : "active";
        if (!channels.length || channels[0].serverId !== server.id) return (<div className="channel-bar-div"></div>);
        return (
            <div className="channel-bar-div">
                <div 
                    className={`channel-bar-server-header ${active}`} 
                    tabIndex="1"
                    onClick={this.handleClick}
                    onBlur={this.handleBlur}
                >
                    {this.toggleDropdown()}
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