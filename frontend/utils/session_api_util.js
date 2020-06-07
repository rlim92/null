export const signupWithAvatar = (user) => {
    return $.ajax({
        method: "POST",
        url: "/api/users",
        data: user,
        contentType: false,
        processData: false,
        dataType: "json"
    });
};

export const signup = (user) => {
    return $.ajax({
        method: "POST",
        url: "/api/users",
        data: { user },
    });
};

export const login = (user) => {
    return $.ajax({
        method: "POST",
        url: "/api/session",
        data: { user }
    });
};

export const logout = () => {
    return $.ajax({
        method: "DELETE",
        url: "/api/session"
    });
};

export const fetchCurrentUser = (userId) => {
    return $.ajax({
        method: "GET",
        url: `/api/session/${userId}`
    });
};