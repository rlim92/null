import React from 'react';
import { Switch, Route } from 'react-router-dom'; 
import ChannelBar from '../channel/channel_bar';
import DMBar from '../direct_message/dm_bar';
import FooterProfile from './footer_profile';
// import { connect } from 'react-redux';

// class ActiveBar extends React.Component {
//     constructor(props) {
//         super(props);
//     }

//     mapChatRooms() {
//         const { chatRooms, chatType } = this.props;
//         return chatRooms.map((chatroom, idx) => {
//             return (
//                 <li key={`${chatType}-idx`} classname={`${chatType}-li`}>

//                 </li>
//             )
//         })
//     }

//     render() {
//         return (
//             <div className="activebar-div">

//             </div>
//         )
//     }
// }

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