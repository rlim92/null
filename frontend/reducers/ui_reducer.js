const uiReducer =  (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        default:
            return state;
    }
};

export default uiReducer;