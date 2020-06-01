export const fetchServerChs = serverId => {
    return $.ajax({
        method: "GET",
        url: `/api/servers/${serverId}/channels`
    });
};

export const fetchChannelInfo = channelId => {
    return $.ajax({
        method: "GET",
        url: `/api/channels/${channelId}`
    })
}
