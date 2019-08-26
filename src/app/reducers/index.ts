import { combineReducers } from 'redux';
import { ApplicationState } from 'app/reducers/types';
import robot from 'app/reducers/robot';

export default combineReducers<ApplicationState>({ robot });
