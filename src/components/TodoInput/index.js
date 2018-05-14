import React from 'react';
import PropTypes from 'prop-types';

import './todoInput.css';

export default class TodoInput extends React.PureComponent {

    static propTypes = {
        addTodo: PropTypes.func,
    }

    static defaultProps = {
        addTodo: (input) => { },
    }

    state = {
        inputValue: '',
    }

    addTodo = () => {
        this.props.addTodo(this.state.inputValue);
        this.setState({ inputValue: '' });
    }

    _allowAdd(value) {
        return value !== undefined && value.length > 0;
    }

    render() {
        const { inputValue } = this.state;

        return <div className="todo-input-container shadow-container" >
            <TextInput
                value={inputValue}
                onChange={(value) => {
                    this.setState({inputValue: value});
                }} 
                addTodo={this.addTodo}
            />
            {
                this._allowAdd(inputValue) ? <AddTodo addTodo={this.addTodo} /> : null
            }
        </div>;
    }
};

const TextInput = (props) => {
    return <input
        className="todo-input"
        type="text"
        placeholder="Enter TODO here."
        value={props.value}
        onChange={(e) => {
            props.onChange(e.target.value);
        }}
        onKeyPress={(e) => {
            if (e.key === 'Enter') {
                props.addTodo();
            }
        }}
    />
}

TextInput.propTypes = {
    addTodo: PropTypes.func,
    onChange: PropTypes.func,
}

const AddTodo = (props) => {
    return <span className="add-todo" onClick={() => {
        props.addTodo();
    }}>
        {`Add`}
    </span>;
}

AddTodo.propTypes = {
    addTodo: PropTypes.func,
}
