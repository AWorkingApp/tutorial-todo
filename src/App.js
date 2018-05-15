import React, { PureComponent } from 'react';

import TodoTitle from './components/TodoTitle';
import TodoInput from './components/TodoInput';
import TodoDetail from './components/TodoDetail';

import './App.css';

class App extends PureComponent {
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
      <div className='container'>
        <div style={{ height: '100%', width: 400 }}>
          <TodoTitle />
          <div style={{ margin: 25, marginTop: 16, }}>
            <TodoInput addTodo={(todo) => {
              this.setState((prevState) => ({
                todos: [{ id: Date.now(), complete: false, content: todo }].concat(prevState.todos)
              }));
            }} />
          </div>
          <div style={{ marginTop: 10 }}>
            {
              this.state.todos.length > 0 ?
                <TodoDetail
                  todos={this.state.todos}
                  onComplete={(id) => {
                    const todoIdx = this._findTodoIndex(id);
                    const newTodos = [].concat(this.state.todos);
                    newTodos[todoIdx].complete = !newTodos[todoIdx].complete;
                    this.setState({ todos: newTodos });
                  }}
                  onRemove={(id) => {
                    const todoIdx = this._findTodoIndex(id);
                    const newTodos = [].concat(this.state.todos);
                    newTodos.splice(todoIdx, 1);
                    this.setState({ todos: newTodos });
                  }}
              /> : null
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
