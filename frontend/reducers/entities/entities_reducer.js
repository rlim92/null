import { combineReducers } from 'redux';
import users from './users_reducer';
import channels from './channels_reducer';
import servers from './servers_reducer';
import directMessages from './dms_reducer';
import messages from './messages_reducer';

const entitiesReducer = combineReducers({
    users,
    servers,
    channels,
    directMessages,
    messages
});

export default entitiesReducer;