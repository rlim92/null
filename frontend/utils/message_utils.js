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