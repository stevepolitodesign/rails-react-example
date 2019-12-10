import React from 'react'
import PropTypes from 'prop-types'

import axios from 'axios'
import setAxiosHeaders from './AxiosHeaders'

import 'bootstrap'

class TodoItem extends React.Component {
    constructor(props) {
        super(props)
        this.todoItem = this.props.todoItem
        this.handleChange = this.handleChange.bind(this)
        this.handleDestroy = this.handleDestroy.bind(this)
        this.inputRef = React.createRef()
        this.completedRef = React.createRef()
    }
    handleChange() {
        setAxiosHeaders()
        axios
            .put(`/api/v1/todo_items/${this.todoItem.id}`, {
                todo_item: {
                    title: this.inputRef.current.value,
                    complete: this.completedRef.current.checked,
                },
            })
            .then(response => {
                const todoItem = response.data
                this.props.clearErrors()
                this.props.updateTodoItem(todoItem)
            })
            .catch(error => {
                this.props.handleErrors(error)
            })
    }
    handleDestroy() {
        setAxiosHeaders()
        const confirmation = confirm('Are you sure?')
        if (confirmation) {
            axios
                .delete(`/api/v1/todo_items/${this.todoItem.id}`)
                .then(response => {
                    console.log(response)
                    this.props.getToDoItems()
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
    render() {
        const { title, complete } = this.todoItem
        return (
            <tr>
                <td>
                    <input
                        type="text"
                        value={title}
                        disabled={complete}
                        onChange={this.handleChange}
                        ref={this.inputRef}
                        className="form-control"
                    />
                </td>
                <td>
                    <input
                        type="boolean"
                        checked={complete}
                        type="checkbox"
                        onChange={this.handleChange}
                        ref={this.completedRef}
                    />
                </td>
                <td>
                    <button
                        onClick={this.handleDestroy}
                        className="btn btn-outline-danger"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        )
    }
}

export default TodoItem

TodoItem.propTypes = {
    todoItem: PropTypes.object.isRequired,
    updateTodoItem: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    getToDoItems: PropTypes.func.isRequired,
}
