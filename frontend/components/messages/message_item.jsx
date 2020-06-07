import React from 'react';
import { getMessageTime } from '../../utils/message_utils';

const MessageItem = ({ msg, author }) => {
    const date = new Date(msg.createdAt);
    if (!author) return null;
    return (
        <li className="message-item-li">
            <img className="message-item-icon" src={author.avatarUrl} height="40" width="40" alt=""/>
            <div className="message-item-content-div">
                <div className="message-item-author-date-div">
                    <div className="message-item-author-div">
                        {author.username}
                    </div>
                    <div className="message-item-time-div">
                        {getMessageTime(date)}
                    </div>
                </div>
                <p className="message-content">
                    {msg.text}
                </p>
            </div>
        </li>
    )
}

export default MessageItem;