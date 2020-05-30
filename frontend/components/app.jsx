import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';
import Rich from './rich';
import Signup from './session/signup';
import Login from './session/login';

const App = () => {
    return (
        <div className="app-div">
            <header>
            </header>
            <Switch>
                {/* <ProtectedRoute path="/"/> */}
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route exact path="/" component={Rich} />
            </Switch>
        </div>
    )
}

export default App;