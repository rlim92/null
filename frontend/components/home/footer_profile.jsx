import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';

const FooterProfile = props => {
    return (
        <div className="footer-profile-div">
            <div className="footer-profile-left-div">
                <div className="footer-icon-div">
                    <img src="https://image.flaticon.com/icons/svg/860/860168.svg" height="28" width="28" />
                </div>
                <div className="footer-current-username-div">
                    {props.currentUser.username}
                </div>
            </div>
            <div>
                <button className="logout-button" onClick={()=> {
                    App.cable.disconnect();
                    props.logout() 
                }}>
                    Logout
                </button>
            </div>
        </div>
    );
}

const mSTP = state => {
    const currentUser = state.entities.users[state.session.id];
    return {
        currentUser
    }
}

const mDTP = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
}


export default connect(mSTP, mDTP)(FooterProfile);