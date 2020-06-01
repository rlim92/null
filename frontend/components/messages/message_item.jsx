import React from 'react';

const MessageItem = ({ msg, author }) => {
    return (
        <li className="message-item-li">
            <div className="message-item-icon-div">

            </div>
            <div className="message-item-content-div">
                <div className="message-item-author-date-div">
                    <span className="message-item-author-span">
                        {author.username}
                    </span>
                    <span className="message-item-author-span">
                        {msg.createdAt}
                    </span>
                </div>
                <p>
                    {msg.text}
                </p>
            </div>
        </li>
    )
}

export default MessageItem;