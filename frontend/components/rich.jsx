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

        // return (
        //     <div className="loader-div fade-out">
        //         <h1 className="loader-h1 fade-out">Welcome to reactRich...</h1>
        //         <h1 className="loader-h1 hidden">Click below to enter...</h1>
        //         <button className="session-button" onClick={() => this.props.openModal('login')}>Login</button>
        //         <button className="session-button" onClick={() => this.props.openModal('signup')}>Signup</button>
        //         {/* <div className="svg" > */}
        //             {/* <svg version="1.1" id="svg" x="0px" y="0px" width="250px" height="250px" viewBox="0 0 213.235 241.176" enableBackground="new 0 0 213.235 241.176" space="preserve" fill="#282829">
        //                 <path d="M108.581,64.968V14.124l44.007,25.422L108.581,64.968" />
        //                 <path fillOpacity="0.9" d="M153.591,92.101V41.258L109.582,66.68L153.591,92.101" />
        //                 <path d="M155.586,92.062V41.221l44.009,25.42L155.586,92.062" />
        //                 <path fillOpacity="0.7" d="M200.299,119.14V68.297l-44.004,25.421L200.299,119.14" />
        //                 <path fillOpacity="0.85" d="M155.586,146.255V95.412l44.009,25.422L155.586,146.255" />
        //                 <path fillOpacity="0.7" d="M200.299,173.35v-50.844l-44.004,25.422L200.299,173.35" />
        //                 <path fillOpacity="0.6" d="M155.586,200.482v-50.84l44.009,25.417L155.586,200.482" />
        //                 <path fillOpacity="0.5" d="M153.591,200.521v-50.84l-44.009,25.418L153.591,200.521" />
        //                 <path fillOpacity="0.6" d="M108.581,227.696v-50.844l44.007,25.421L108.581,227.696" />
        //                 <path fillOpacity="0.5" d="M106.62,227.696v-50.844l-44.005,25.421L106.62,227.696" />
        //                 <path fillOpacity="0.7" d="M61.562,200.553V149.71l44.007,25.423L61.562,200.553" />
        //                 <path fillOpacity="0.7" d="M59.709,200.56v-50.843l-44.008,25.422L59.709,200.56" />
        //                 <path fillOpacity="0.7" d="M14.699,173.467v-50.843l44.01,25.42L14.699,173.467" />
        //                 <path fillOpacity="0.5" d="M59.709,146.235V95.392l-44.008,25.42L59.709,146.235" />
        //                 <path fillOpacity="0.7" d="M14.699,119.141V68.297l44.01,25.421L14.699,119.141" />
        //                 <path fillOpacity="0.6" d="M59.709,92.101V41.258L15.701,66.68L59.709,92.101" />
        //                 <path fillOpacity="0.85" d="M61.562,92.092V41.249l44.007,25.419L61.562,92.092" />
        //                 <path fillOpacity="0.9" d="M106.62,64.968V14.124L62.614,39.546L106.62,64.968" />
        //             </svg> */}
        //         {/* </div> */}
        //     </div>
        // )
    }
}

const mDTP = dispatch => {
    return{
        openModal: modal => dispatch(openModal(modal))
    }
};

export default connect(null, mDTP)(Rich);