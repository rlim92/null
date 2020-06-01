import React from 'react';
import { Switch, Route } from 'react-router-dom'; 
import ChannelBar from '../channel/channel_bar';
import DMBar from '../direct_message/dm_bar';
import FooterProfile from './footer_profile';


const ActiveBar = () => {
    return (
        <div className="activebar-div">
            <Switch>
                <Route path="/channels/:serverId/:channelId" component={ChannelBar}/>
                <Route path="/@me" component={DMBar} />
            </Switch>
            <FooterProfile />
        </div>
    )
}

export default ActiveBar;