import { fromJS } from 'immutable';
import * as Actions from './actions';

const initialState = fromJS({
  todos: [],
});

export default function todoReducer(state = initialState, action) {
  let todoIndex;
  switch(action.type){
    case Actions.ADD_TODO:
      return state.update('todos', (todos) => todos.push(fromJS(action.todo)));

    case Actions.COMPLETE_TODO:
      todoIndex = state.get('todos').findIndex((todo) => todo.get('id') === action.id);
      return state.updateIn(['todos', todoIndex], (todo) => {
        return todo.set('complete', !todo.get('complete'));
      });

    case Actions.REMOVE_TODO:
      todoIndex = state.get('todos').findIndex((todo) => todo.get('id') === action.id);
      return state.deleteIn(['todos', todoIndex]);
    
    default:
      return state;
  }
};
