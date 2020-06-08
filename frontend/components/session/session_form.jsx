import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.props.session;

        this.link = this.props.formType === "Sign up" ? "/login" : "/signup";

        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    update(field) {
        return e => {
            this.setState({ [field]: e.target.value })
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.props.formType !== "Sign up" || !this.state.avatarFile) {
            this.props.action(this.state).then(() => {
                this.props.closeModal();
            });
            return;
        }

        const formData = new FormData();

        formData.append('user[username]', this.state.username);
        formData.append('user[email]', this.state.email);
        formData.append('user[password]', this.state.password);

        if (this.state.avatarFile) {
            formData.append('user[avatar]', this.state.avatarFile);
        }


        this.props.signupWithAvatar(formData).then(() => {
            this.props.closeModal();
        });
    }

    handleFile(e) {
        e.preventDefault();

        const file = e.currentTarget.files[0];

        const fileReader = new FileReader();

        fileReader.onloadend = () => {
            this.setState({
                avatarFile: file,
                avatarUrl: fileReader.result
            });
        };

        if (file) {
            fileReader.readAsDataURL(file);
        } else {
            this.setState({ avatarUrl: "", avatarFile: null });
        }
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

    avatarInput() {
        if (this.props.formType === 'Sign up') { 
            return (
                <input type="file"
                    onChange={this.handleFile}
                />
            )
        }
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
        const preview = this.state.photoUrl ? <img src={this.state.photoUrl} /> : null;
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
                    {this.avatarInput()}
                    <button>{this.props.formType}!</button>
                </form>
            </div>
        )
    }
};

export default SessionForm;
