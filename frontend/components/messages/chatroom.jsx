import React from 'react';
import MessageItem from './message_item';
import MessageForm from './message_form';

class Chatroom extends React.Component {
    constructor(props) {
        super(props);

        this.bottom = React.createRef();
        this.activateLive = this.activateLive.bind(this);
        this.mapMessages = this.mapMessages.bind(this);
    }

    componentDidMount() {
        const { fetchChatroomInfo } = this.props;

        fetchChatroomInfo().then(this.activateLive);
    }

    componentDidUpdate(prevProps) {
        const { chatType, match, fetchChatroomInfo, } = this.props;

        if (this.bottom.current) {
            this.bottom.current.scrollIntoView();
        }

        if (prevProps.chatType !== chatType || match.params.channelId !== prevProps.match.params.channelId || match.params.dmId !== prevProps.match.params.dmId) {
            fetchChatroomInfo().then(this.activateLive);
        }
    }

    activateLive() {
        const chatroomId = this.props.chatType === "ChannelChat" ? this.props.match.params.channelId : this.props.match.params.dmId;
        if (App.currentChannel) {
            App.currentChannel.unsubscribe();
        }

        App.currentChannel = App.cable.subscriptions.create(
            {
                channel: this.props.chatType,
                id: chatroomId,
                authorId: this.props.currentUserId
            },
            {
                received: data => {
                    switch (data.type) {
                        case 'message':
                            this.props.receiveMessage(JSON.parse(data.message));
                            break;
                    }
                },
                speak: function (data) { return this.perform('speak', data) },
                load: function () { return this.perform('load') }
            }
        );
    }

    mapMessages() {
        const { messages, members } = this.props;

        const messageLis = messages.map((msg, idx) => {
            const author = members[msg.authorId];
            return (
                <MessageItem key={`msg-${idx}`} msg={msg} author={author} />
            )
        })

        return messageLis;
    }

    render() {
        const { channel, dm, members, currentUserId } = this.props;
        let name, chatroom, chatType;
        if (!channel && !dm) return null;
        if (channel) {
            name = channel.name;
            chatroom = channel;
            chatType = "#";
        } else if (dm && !dm.name) {
            name = []
            Object.values(members).forEach(mem => { 
                if (mem) {
                    if (currentUserId === mem.id) return;
                    name.push(mem.username);
                }
            })
            name = name.join(", ");
            chatroom = dm;
            chatType = "@";
        }

        return (
            <div className="chatroom-div-container">
                <div className="chatroom-header-div">
                    <div className="chatroom-title-div">
                        <div className="chat-type-span">{chatType}</div>
                        <div className="title-div">{name}</div>
                    </div>
                </div>
                <ul className="message-ul">
                    {this.mapMessages()}
                    <div ref={this.bottom}></div>
                </ul>
                <MessageForm chatroom={chatroom} chatType={chatType} name={name}/>
            </div>
        )
    }
}

export default Chatroom;