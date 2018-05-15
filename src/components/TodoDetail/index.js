import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './todoList.css';

const FilterAll = 0;
const FilterTodo = 1;
const FilterCompleted = 2;

export default class TodoDetail extends React.PureComponent { 
    static propTypes = {
        todos: PropTypes.array,
        onComplete: PropTypes.func,
        onRemove: PropTypes.func,
    }

    static defaultProps = {
        onComplete: (id) => {},
        onRemove: (id) => {},
    }

    state = {
        filterValue: FilterAll,
        filterItems: [
            {
                name: 'All',
                value: FilterAll,
            },
            {
                name: 'To Do',
                value: FilterTodo,
            },
            {
                name: 'Completed',
                value: FilterCompleted,
            },
        ]
    }

    _activeTodoCount(todos) {
        return todos.filter((todo) => !todo.complete).length;
    }

    _filteredTodos(todos, filterValue) {
        switch (filterValue) {
            case FilterCompleted:
                return todos.filter((todo) => todo.complete);

            case FilterTodo:
                return todos.filter((todo) => !todo.complete);

            case FilterAll:
            default:
                return todos;
        }
    }

    render() {
        const { todos, onComplete, onRemove } = this.props;
        return <div className='todo-detail-container shadow-container'>
             <TodoHeader
                filterItems={this.state.filterItems}
                activeCount={this._activeTodoCount(todos)}
                onFilter={(filterValue) => {
                    this.setState({ filterValue: filterValue });
                }}
            />
            <TodoList
                todos={this._filteredTodos(todos, this.state.filterValue)}
                onComplete={onComplete}
                onRemove={onRemove}
            />
        </div>
    }
}


function TodoHeader(props) {
    return <div className='todo-header flex-center'>
            <div className='todo-header-count'> 
                {`${props.activeCount} left`}
            </div>
            <div className='todo-header-filter-container flex-center'>
                <TodoFilter filterItems={props.filterItems} onFilter={props.onFilter} />
            </div>
        </div>
}

class TodoFilter extends React.PureComponent {

    state = {
        activeFilterIndex: 0,
    }

    render() {
        return <div className='todo-filter-container'>
            {
                this.props.filterItems.map((item, index) => <TodoFilterItem 
                        key={index}
                        active={index === this.state.activeFilterIndex} 
                        onFilter={(value) => {
                            this.setState({ activeFilterIndex: index });
                            this.props.onFilter(value);
                        }}
                        {...item} 
                    />)
            }
        </div>
    }
}

function TodoFilterItem (props) {
    let className = props.active ? 'filter-item-active' : 'filter-item-inactive'
    return (<div className={`${className} filter-item`} onClick={() => props.onFilter(props.value)}>
        <span>{props.name}</span>
    </div>)
}

function TodoList(props) {
    const { todos, onComplete, onRemove } = props;
    return <Fragment>
        {
            todos.map((todo) => <TodoItem key={todo.id} {...{ todo, onComplete, onRemove }} />)
        }
    </Fragment>
}

function TodoItem(props) {
    const { todo, onComplete, onRemove } = props;

    return <div className='todo-item'> 
        <TodoComplete
            complete={todo.complete}
            onComplete={() => {
                onComplete(todo.id);
            }}
        />
        <TodoContent {...todo} />
        <TodoRemove
            onRemove={() => {
                onRemove(todo.id);
            }}
        />
    </div>
}

function TodoComplete(props) {
    return <div className="todo-complete-container flex-center" onClick={props.onComplete}>
        <span className={'todo-complete'}>{ props.complete ? 'Undo' : 'Done'}</span>
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
    return <div className="todo-remove flex-center" onClick={props.onRemove}>
        <span className="flex-center">X</span>
    </div>
}