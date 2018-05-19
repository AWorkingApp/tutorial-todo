import React, { PureComponent } from 'react';

import TodoApp from './containers/todoApp';

// connect with redux
import { Provider } from 'react-redux'
import store from './store';

import './App.css';

class App extends PureComponent {
  /**
   * todo : {
   *   id: currentTime
   *   complete: bool,
   *   content: string,
   * }
   */

  render() {
    return (
      <Provider store={store}>
        <div className='container'>
          <TodoApp />
        </div>
      </Provider>
    );
  }
}

export default App;
