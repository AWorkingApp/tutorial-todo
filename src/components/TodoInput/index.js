import React from 'react';
import './todoInput.css';

export default class TodoInput extends React.PureComponent {
    render() {
        return <div className="todo-input-container shadow-container" >
        </div>;
    }
};

const TextInput = (props) => {
    return <input
        className="todo-input"
        type="text"
        placeholder="Enter TODO here." />
}

const AddTodo = (props) => {
    return <span className="add-todo">
    </span>;
}