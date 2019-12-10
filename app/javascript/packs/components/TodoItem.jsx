import React from 'react'
import PropTypes from 'prop-types'

import axios from 'axios'
import setAxiosHeaders from './AxiosHeaders'

class TodoItem extends React.Component {
    constructor(props) {
        super(props)
        this.todoItem = this.props.todoItem
        this.handleChange = this.handleChange.bind(this);
        this.inputRef = React.createRef();
        this.completedRef = React.createRef();
    }
    handleChange() {
        setAxiosHeaders();
        axios.put(`/api/v1/todo_items/${this.todoItem.id}`, {
          todo_item: {
            title: this.inputRef.current.value,
            complete: this.completedRef.current.checked
          }
        })
        .then( (response) => {
            const todoItem = response.data
            this.props.updateTodoItem(todoItem)
        })
        .catch((error) => {
            // TODO handle this
            console.log(error);
            this.props.handleErrors('there was an error');
        });      
    }
    render(){
        const { id, title, complete } = this.todoItem;
        return (
            <div index={id}>
                <input type="text" value={title} onChange={this.handleChange} ref={this.inputRef} />
                <label>
                    Complete:
                    <input type="boolean" checked={complete} type="checkbox" onChange={this.handleChange} ref={this.completedRef} />
                </label>
            </div>
        )   
    }
}

export default TodoItem

TodoItem.propTypes = {
    todoItem: PropTypes.object.isRequired,
    updateTodoItem: PropTypes.func.isRequired
};