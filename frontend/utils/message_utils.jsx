export const fetchMessage = messageId => {
    return $.ajax({
        method: "GET",
        url: `/api/messages/${messageId}`
    });
};

