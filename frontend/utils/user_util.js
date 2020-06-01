export const fetchDMsMembers = (dmIds) => {
    return $.ajax({
        method: "GET",
        url: `/api/users`,
        data: { dm_ids: dmIds}
    });
};