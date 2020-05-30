import { combineReducers } from 'redux';
import session from './session_errors_reducer';
// import channelErrors from './channel_errors_reducer';
// import messageErrors from './message_errors_reducer';

const errorsReducer = combineReducers({
    session,
    // channel: channelErrors,
    // message: messageErrors
});

export default errorsReducer;