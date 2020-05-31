import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ServerBar extends React.Component {
    constructor(props) {
        super(props);

        this.mapServers = this.mapServers.bind(this);
    }

    mapServers() {
        const { servers } = this.props;

        return servers.map( (server, idx) => {
            const firstChId = server.channelIds[0];
            return (
                <Link to={`/channels/${server.id}/${firstChId}`} 
                    key={`server-${idx}`} 
                    className="server-link"
                >
                    <div className={`server-bar-div-li server-icon-${idx}`}>
                        <li className="server-bar-li">
                            {server.name.slice(0,1)}
                        </li>
                    </div>
                </Link>
            )
        })
    }

    render() {
        if (!this.props.servers) return null;

        return (
            <div className="server-bar-div">
                {this.mapServers()}
            </div>
        )
    }
}

const mSTP = state => {
    return {
        servers: Object.values(state.entities.servers)
    }
}


export default connect(mSTP, null)(ServerBar);