import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './todoList.css';

export default class TodoDetail extends React.PureComponent { 

    static propTypes = {
        todos: PropTypes.array,
    }

    render() {
        const { todos, } = this.props;
        return <div className='todo-detail-container shadow-container'>
           <TodoList
                todos={todos}
            />
        </div>
    }
}

function TodoHeader(props) {
    return <div className='todo-header flex-center'>
            <div className='todo-header-count'> 
            </div>
            <div className='todo-header-filter-container flex-center'>
            </div>
        </div>
}

class TodoFilter extends React.PureComponent {
    render() {
        return <div className='todo-filter-container'>
        </div>
    }
}

function TodoFilterItem (props) {
    let className = props.active ? 'filter-item-active' : 'filter-item-inactive'
    return (<div className={`${className} filter-item`}>
        <span>{props.name}</span>
    </div>)
}

function TodoList(props) {
    const { todos, } = props;

    return <Fragment>
        {
            todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        }
    </Fragment>
}

function TodoItem(props) {
    const { todo } = props;

    return <div className='todo-item'> 
        <TodoContent {...todo} />
    </div>
}

function TodoComplete(props) {
    return <div className="todo-complete-container flex-center">
        <span className={'todo-complete'}></span>
    </div>
}

function TodoContent(props) {
    return <div className="todo-content">
        <span style={{
            textDecoration: props.complete ? 'line-through' : 'none',
            color: 'grey',
            opacity: props.complete ? 0.2 : 0.9,
            fontWeight: props.complete ? '100' : '200',
        }}>{props.content}</span>
        </div>
}

function TodoRemove(props) {
    return <div className="todo-remove flex-center">
        <span className="flex-center">X</span>
    </div>
}
