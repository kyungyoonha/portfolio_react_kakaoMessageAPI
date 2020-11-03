import { combineReducers } from 'redux';
import authReducer from './authReducer';
import dataReducer from './dataReducer';
import formReducer from './formReducer';
import pageReducer from './pageReducer';

export default combineReducers({
    auth: authReducer,
    data: dataReducer,
    page: pageReducer,
    form: formReducer,
})