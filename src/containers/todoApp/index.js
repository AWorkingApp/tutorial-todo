import React, { PureComponent } from 'react';
import { connect } from 'react-redux'

import TodoTitle from '../../components/TodoTitle';
import TodoInput from '../../components/TodoInput';
import TodoDetail from '../../components/TodoDetail';

import * as Actions from './actions';

class TodoApp extends PureComponent {
  /**
   * todo : {
   *   id: currentTime
   *   complete: bool,
   *   content: string,
   * }
   */

  state = {
    todos: [],
  }

  _findTodoIndex = (id) => {
    return this.state.todos.findIndex((todo) => todo.id === id);
  }

  render() {
    return (
      <div style={{ height: '100%', width: 400 }}>
        <TodoTitle />
        <div style={{ margin: 25, marginTop: 16, }}>
          <TodoInput addTodo={(todo) => {
            // this.setState((prevState) => ({
            //   todos: [].concat(prevState.todos)
            // }));
            this.props.addTodo({ id: Date.now(), complete: false, content: todo });
          }} />
        </div>
        <div style={{ marginTop: 10, }}>
          {
            this.props.todos.length > 0 ?
              <TodoDetail
                todos={this.props.todos}
                onComplete={(id) => {
                  // const todoIdx = this._findTodoIndex(id);
                  // const newTodos = [].concat(this.state.todos);
                  // newTodos[todoIdx].complete = !newTodos[todoIdx].complete;
                  // this.setState({ todos: newTodos });

                  this.props.onComplete(id);
                }}
                onRemove={(id) => {
                  // const todoIdx = this._findTodoIndex(id);
                  // const newTodos = [].concat(this.state.todos);
                  // newTodos.splice(todoIdx, 1);
                  // this.setState({ todos: newTodos });

                  this.props.onRemove(id);
                }}
              /> : null
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos.get('todos').toJS()
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onComplete: id => {
      dispatch(Actions.completeTodo(id))
    },

    onRemove: id => {
      dispatch(Actions.removeTodo(id))
    },

    addTodo: todo => {
      dispatch(Actions.addTodo(todo))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
