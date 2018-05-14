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
            <TodoDetail />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
