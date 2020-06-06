import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ServerBar extends React.Component {
    constructor(props) {
        super(props);

        if (props.location.pathname.includes('@me')) {
            this.state = {
                activeServ: null
            }
        } else {
            this.state = {
                activeServ: parseInt(props.location.pathname.split('/')[2])
            }
        }

        this.activeServ = this.activeServ.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { location } = this.props;
        if (location.pathname.includes('@me') && !prevProps.location.pathname.includes("@me")) {
            this.activeServ(null);
        } else if (!location.pathname.includes('@me') && prevProps.location.pathname.includes("@me")) {
            this.activeServ(parseInt(location.pathname.split('/')[2]));
        }
    }

    activeServ(id) {
        this.setState({ activeServ: id })
    }

    mapServers() {
        const { servers } = this.props;
        let count = 0;

        return servers.map( (server, idx) => {
            const firstChId = server.channelIds[0];
            const activeServ = this.state.activeServ === server.id ? "active-serv" : ""
            return (
                <div className="server-item-div" key={`server-${idx}`} >
                    <div className={`invis-serv-div`} id={`go-${activeServ}`}></div>
                    <Link to={`/channels/${server.id}/${firstChId}`} 
                        className="server-link"
                    >
                        <div onClick={() => this.activeServ(server.id)} 
                            className={`server-bar-div-li server-icon-${idx} ${activeServ}`}>
                            <li className="server-bar-li">
                                {server.name.slice(0,1)}
                            </li>
                        </div>
                    </Link>
                </div>
            )
        })
    }

    render() {
        if (!this.props.servers) return null;
        const activeMe = this.state.activeServ ? "" : "active-serv";
        
        return (
            <>
                <div className="me-div">
                    <div className={`invis-me-div`} id={`go-${activeMe}`}></div>
                    <Link to={{ pathname: '/@me', state: "fromLink" }} className="link me-link">
                        <div className={`server-bar-div-li me-div-li ${activeMe}`}>
                            <li className="me-li server-bar-li">
                                <img src="https://image.flaticon.com/icons/svg/860/860168.svg" height="44" width="44" />
                            </li>
                        </div>
                    </Link>
                </div>
                <div className="server-bar-border-div"></div>
                <div className={`server-bar-div`}>
                    {this.mapServers()}
                </div>
            </>
        )
    }
}

const mSTP = state => {
    return {
        servers: Object.values(state.entities.servers)
    }
}


export default connect(mSTP, null)(ServerBar);