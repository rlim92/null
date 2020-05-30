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
        if (!servers.length) return;
        return servers.map( (server, idx) => {
            return (
                <div key={`server-${idx}`} className="server-bar-div-li">
                    <li className="server-bar-li">
                        {server.name.slice(0,1)}
                    </li>
                </div>
            )
        })
    }

    render() {
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