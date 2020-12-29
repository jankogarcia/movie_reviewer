import {combineReducers} from 'redux';
import movies from './movies_reducer';
import user from './user_reducer';

const rootReducer = combineReducers({
    movies,
    user
});

export default rootReducer;