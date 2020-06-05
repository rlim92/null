import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';
import Rich from './rich';
import Home from './home/home';
import Modal from './ui/modal';

const App = () => {
    return (
        <div className="app-div">
            <Modal />
            <Switch>
                <AuthRoute exact path="/" component={Rich} />
                <ProtectedRoute path="/" component={Home}/>
            </Switch>
        </div>
    )
}

export default App;