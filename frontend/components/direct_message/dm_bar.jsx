import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { fetchDMsMembers } from '../../actions/user_actions';
import { fetchUserDms } from '../../actions/dm_actions';

class DMBar extends React.Component {
    constructor(props) {
        super(props);
        this.fire = window.fireIcon;
        this.water = window.waterIcon;
        this.lightning = window.lightningIcon;
        this.wind = window.windIcon;

        if (props.location && props.location.state) {
            this.needPull = true;
        }

        this.mapDMs = this.mapDMs.bind(this);
    }

    componentDidMount() {
        const { fetchUserDms, currentUser } = this.props;

        fetchUserDms(currentUser.id);
        this.needPull = false;
    }

    getIcons(dm) {
        const { users } = this.props;
        const userId = dm.memberIds[0];
        const avatar = users[userId].avatarUrl ? users[userId].avatarUrl : "";
        if (!avatar) return avatar;
        return (
            <img 
                height="32" 
                width="32" 
                className="avatar-img"
                src={avatar} 
            />
        )
    }

    mapDMs() {
        const { directMessages, users } = this.props;
        let needPull;

        const dmLis = directMessages.map((dm, idx) => {
            const memberCount = dm.memberIds.length > 2 ? <div className="dm-member-count">{dm.memberIds.length} Members</div> : "";

            let memberNames = dm.memberIds.map( id => {
                if (!users[id]) {
                    needPull = true;
                    return;
                }
                return users[id].username;
            })

            memberNames = memberNames.slice(0, memberNames.length - 1).join(", ");
            
            if (memberNames.length > 23) {
                memberNames = `${memberNames.slice(0, 22)}...`;
            }

            const img = this.getIcons(dm);

            return (
                <Link to={`/@me/dms/${dm.id}`} key={`dm-${idx}`} className="link dm-link">
                    <li className="dm-names-li">
                        <div className={`dm-user-avatar-div`}>{img}</div>
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

        if (needPull) {
            return [];
        } else {
            return dmLis;
        }
    }

    render() {

        if (this.needPull) return <div className="dm-bar-div"></div>;

        return (
            <div className="dm-bar-div">
                <div className="search-header-div">
                    <div className="search-div">Find or start a conversation      </div>
                </div>
                <div className="dm-border-div dm-border-border"></div>
                <div className="main-dm-bar-div">
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
            </div>
        )
    }
}

const mSTP = state => {
    return {
        directMessages: Object.values(state.entities.directMessages),
        users: state.entities.users,
        currentUser: state.entities.users[state.session.id],
    }
};

const mDTP = dispatch => {
    return {
    //     fetchDMsMembers: (currentUserId) => dispatch(fetchDMsMembers(currentUserId))
        fetchUserDms: (userId) => dispatch(fetchUserDms(userId))
    }
};


export default connect(mSTP, mDTP)(DMBar);