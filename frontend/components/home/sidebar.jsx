import React from 'react';
import ServerBar from '../server/server_bar';
import { Link } from 'react-router-dom';


const Sidebar = (props) => {
    return (
        <div className="sidebar-div">
            <div className="me-div">
                <Link to={{ pathname: '/@me', state: "fromLink" }} className="link">
                    <div className="server-bar-div-li me-div-li">
                        <li className="me-li server-bar-li">
                            <img src="https://image.flaticon.com/icons/svg/860/860168.svg" height="44" width="44"/>
                        </li>
                    </div>
                </Link>
            </div>
            <div className="server-bar-border-div"></div>
            <ServerBar />
        </div>
    )
}

export default Sidebar;