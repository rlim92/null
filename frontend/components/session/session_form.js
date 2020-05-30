import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.props.session;

        this.link = this.props.formType === "Sign up" ? "/login" : "/signup";

        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.usernameInput = this.usernameInput.bind(this);
        this.mapErrors = this.mapErrors.bind(this);
    }

    update(field) {
        return e => {
            this.setState({ [field]: e.target.value })
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.action(this.state);
    }
    
    usernameInput() {
        if (this.props.formType === 'Sign up') {
            return(
                <input
                    className="input username"
                    type="text"
                    value={this.state.username}
                    placeholder="username"
                    onChange={this.update('username')}
                />
            );
        };
    }

    mapErrors() {
        let errors;
        if (this.props.errors.length) {
            errors = this.props.errors.map((error,idx) => {
                return (
                    <div key={`error-${idx}`} className='errors' >{error}!</div>
                )
            })
        }
        return errors;
    }

    render() {
        return (
            <div className="session-form-div">
                <form className="session-form" onSubmit={this.handleSubmit}>
                    {this.mapErrors()}
                    <input
                        className="session-input email"
                        type="text"
                        value={this.state.email}
                        placeholder="you@riscord.com"
                        onChange={this.update('email')}
                    />
                    {this.usernameInput()}
                    <input
                        className="session-input password"
                        type="password"
                        value={this.state.password}
                        placeholder="password"
                        onChange={this.update('password')}
                    />
                    <button>{this.props.formType}!</button>
                </form>
                <Link to={this.link}>{this.link.slice(1)}</Link>
            </div>
        )
    }
};

export default SessionForm;