import { RECEIVE_SESSION_ERRORS, RECEIVE_CURRENT_USER } from '../../actions/session_actions';
import { CLEAR_ERRORS } from '../../actions/error_actions';

const sessionErrorsReducer =  (state = [], action) => {
    let newState;
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            newState = [];
            return newState;
        case RECEIVE_SESSION_ERRORS:
            if (action.errors.responseJSON) {
                return action.errors.responseJSON;
            } else {
                return ["Oops! Something went wrong. Please try again"];
            }
        case CLEAR_ERRORS:
            newState = [];
            return newState;
        default:
            return state;
    }
};

export default sessionErrorsReducer;