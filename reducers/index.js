import { combineReducers } from 'redux';

import user from './user';
import general from './general';

const rootReducer = combineReducers({
    general,
    user,
});

export default rootReducer;
