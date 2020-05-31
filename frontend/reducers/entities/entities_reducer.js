import { combineReducers } from 'redux';
import users from './users_reducer';
import channels from './channels_reducer';
import servers from './servers_reducer';
import directMessages from './dms_reducer';

const entitiesReducer = combineReducers({
    users,
    servers,
    channels,
    directMessages
});

export default entitiesReducer;