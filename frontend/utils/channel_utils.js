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

export function handleBlur(ref, callback) {
    return event => {
        const relatedTarget = event.relatedTarget;
        const node = ref.current;
        debugger;
        if (node !== relatedTarget && !node.contains(relatedTarget)) {
            this.handleClick()
        }
    };
}