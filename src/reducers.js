import { combineReducers } from 'redux';

import todoReducer from './containers/todoApp/reducer';
const todoApp = combineReducers({
    todos: todoReducer
})

export default todoApp