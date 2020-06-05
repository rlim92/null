import { START_LOADING } from "../actions/modal_actions";
import { RECEIVE_CURRENT_USER } from "../actions/session_actions";

export default function loadingReducer(state = false, action) {
    switch (action.type) {
        case START_LOADING:
            return true;
        case RECEIVE_CURRENT_USER:
            return false;
        default:
            return state;
    }
}