import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';
import Rich from './rich';
import Signup from './session/signup';
import Login from './session/login';
import Home from './home/home';

const App = () => {
    return (
        <div className="app-div">
            <header>
            </header>
            <Switch>
                <ProtectedRoute path="/" component={Home}/>
                <AuthRoute path="/signup" component={Signup} />
                <AuthRoute path="/login" component={Login} />
                <AuthRoute exact path="/" component={Rich} />
            </Switch>
        </div>
    )
}

export default App;