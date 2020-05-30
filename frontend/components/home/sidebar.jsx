import React from 'react';
// import { connect } from 'react-redux';
import ServerBar from '../server/server_bar';


const Sidebar = (props) => {
    return (
        <div className="sidebar-div">
            <div className="me-div">
                <div className="server-bar-div-li me-div-li">
                    <li className="me-li server-bar-li">
                        <img src="https://image.flaticon.com/icons/svg/860/860168.svg" height="48" width="48"/>
                    </li>
                </div>
            </div>
            <div className="server-bar-border-div"></div>
            <ServerBar />
        </div>
    )
}

export default Sidebar;