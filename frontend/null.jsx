import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';


document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    let preloadedState = {};

    if (window.currentUser) {
        preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: { 
                id: window.currentUser.id, 
                needPull: true
            },
            errors: {
                session: []
            },
            ui: {
                loading: true
            }
        };
        delete window.currentUser;
        const secretInfo = document.querySelector('#boot');
        secretInfo.parentElement.removeChild(secretInfo);
    }
    
    const store = configureStore(preloadedState);
    ReactDOM.render(<Root store={store} />, root);
});