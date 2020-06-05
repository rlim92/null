import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';


document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    let store;
    if (window.currentUser) {
        const preloadedState = {
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
        store = configureStore(preloadedState);
        delete window.currentUser;
        const secretInfo = document.querySelector('#boot');
        secretInfo.parentElement.removeChild(secretInfo);
    } else {
        store = configureStore();
    }

    ReactDOM.render(<Root store={store} />, root);
});