import {combineReducers} from 'redux';
import changeState from './changeState';

const appReducer = combineReducers({
    changeState
});

export default appReducer;