export const fetchUserDms = (userId) => {
    return $.ajax({
        type: "GET",
        url: `/api/users/${userId}/direct_messages`
    })
}