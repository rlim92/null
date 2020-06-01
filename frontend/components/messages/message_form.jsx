import React from 'react';
import { connect } from 'react-redux';

class MessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: "" };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return (e) =>
            this.setState({ [field]: e.currentTarget.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        App.currentChannel.speak({ message: this.state.text });
        this.setState({ text: "" });
    }

    render() {
        const { chatType, name } = this.props;

        return (
            <div className="message-form-div-container">
                <div className="message-form-div">
                    <form className="message-form" onSubmit={this.handleSubmit}>
                        <input
                            className="message-input"
                            type="text"
                            value={this.state.text}
                            onChange={this.update("text")}
                            // onKeyUp={this.handleKeyUp}
                            placeholder={`Message ${chatType}${name}`}
                        />
                    </form>
                </div>
            </div>
        )
    }
}

export default MessageForm;