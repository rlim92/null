import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class DMBar extends React.Component {
    constructor(props) {
        super(props);

        this.mapDMs = this.mapDMs.bind(this);
    }

    mapDMs() {
        const { directMessages, users } = this.props;

        return directMessages.map((dm, idx) => {
            const memberCount = dm.memberIds.length > 2 ? <div className="dm-member-count">{dm.memberIds.length} Members</div> : "";
            
            let memberNames = dm.memberIds.map( id => {
                return users[id].username;
            })

            memberNames = memberNames.slice(0, memberNames.length - 1).join(",");
            
            if (memberNames.length > 18) {
                memberNames = `${memberNames.slice(0, 17)}...`;
            }

            return (
                <Link to={`/@me/dms/${dm.id}`} key={`dm-${idx}`} className="link dm-link">
                    <li className="dm-names-li">
                        <div className="dm-user-avatar-div"></div>
                        <div className="dm-member-div">
                            <div>
                                {memberNames}
                            </div>
                            {memberCount}
                        </div>
                    </li>
                </Link >
            )
        })
    }

    render() {
        return (
            <div className="dm-bar-div">
                <div className="search-div">Find or start a conversation</div>
                <div className="dm-border-div"></div>
                <Link to="/@me/friends" className="link friends-link">
                    <li className="dm-names-li">
                        <div className="dm-user-avatar-div"></div>
                        <div>
                            Friends
                        </div>
                    </li>
                </Link>
                <div className="dm-header-div">Direct Messages</div>
                {this.mapDMs()}
            </div>
        )
    }
}

const mSTP = state => {
    return {
        directMessages: Object.values(state.entities.directMessages),
        users: state.entities.users,
    }
}


export default connect(mSTP, null)(DMBar);