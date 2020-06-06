// export const fetchMessage = messageId => {
//     return $.ajax({
//         method: "GET",
//         url: `/api/messages/${messageId}`
//     });
// };

export const fetchDmMsgs = dmId => {
    return $.ajax({
        method: "GET",
        url: `/api/direct_messages/${dmId}/messages`
    });
};

export const getMessageTime = date => {
    const dateObj = new Date(date);
    const fullHours = dateObj.getHours();
    let hours = fullHours % 12;
    if (hours === 0) hours = 12;
    const minutes = dateObj.getMinutes();
    const tmp = `0${minutes}`;
    const paddedMinutes = tmp.slice(tmp.length - 2);
    const ampm = fullHours < 12 || fullHours === 0 ? 'am' : 'pm';
    return `${hours}:${paddedMinutes}${ampm}`;
};