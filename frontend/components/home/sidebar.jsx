import React from 'react';
import ServerBar from '../server/server_bar';
import { Link, Route } from 'react-router-dom';



const Sidebar = (props) => {
    return (
            <div className="sidebar-div">
                <Route to="/" component={ServerBar} />
            </div>
    )
}

export default Sidebar;