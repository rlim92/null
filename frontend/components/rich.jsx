import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../actions/modal_actions';

class Rich extends React.Component {

    render() {
        const controller = window.controller;

        return (
            <div className="splash-container-div">
                <header>
                    <button className="session-button" 
                        onClick={() => this.props.openModal('login')}
                    >Login
                    </button>
                    <button className="session-button" 
                        onClick={() => this.props.openModal('signup')}
                    >Signup
                    </button>
                </header>
                <div className="splash-div-images">
                    <img className="splash-img desktop" src="https://discord.com/assets/0d82411c439e3558f8b2f6fb12eccbc1.svg" alt="desktop" />
                    <img className="splash-img laptop" src="https://discord.com/assets/7edaed9d86e1b5dd9d4c98484372222b.svg" alt="laptop" />
                    <div>
                        <img className="splash-img controller" src={controller} alt=""/>
                    </div>
                    <div>
                        <img className="splash-img phone-1" src="https://discord.com/assets/82fa4f388cfc9cf47a6972ae39ae90de.svg" alt="phone" />
                    </div>
                    <div>
                        <img className="splash-img phone-2" src="https://discord.com/assets/5a31f41848bf3ba1817a092ac28c623d.svg" alt="phone" />
                    </div>
                </div>
            </div>
        )
    }
}

const mDTP = dispatch => {
    return{
        openModal: modal => dispatch(openModal(modal))
    }
};

export default connect(null, mDTP)(Rich);