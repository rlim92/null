import React from 'react';
import { Switch, Route } from 'react-router-dom'; 
import ChannelBar from '../channel/channel_bar';
import DMBar from '../direct_message/dm_bar';
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
                <Route path="/servers/:serverId" component={ChannelBar}/>
                <Route path="/" component={DMBar} />
            </Switch>
        </div>
    )
}

export default ActiveBar;