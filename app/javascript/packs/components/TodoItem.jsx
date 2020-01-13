import React from 'react'
import PropTypes from 'prop-types'

import axios from 'axios'
import setAxiosHeaders from './AxiosHeaders'

import 'bootstrap'
// import 'bootstrap-icons'

class TodoItem extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleDestroy = this.handleDestroy.bind(this)
        this.inputRef = React.createRef()
        this.completedRef = React.createRef()
    }
    handleChange() {
        setAxiosHeaders()
        axios
            .put(`/api/v1/todo_items/${this.props.todoItem.id}`, {
                todo_item: {
                    title: this.inputRef.current.value,
                    complete: this.completedRef.current.checked,
                },
            })
            .then(response => {
                const updatedTodoItem = response.data
                this.props.clearErrors()
                this.props.updateTodoItem(updatedTodoItem)
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
                .delete(`/api/v1/todo_items/${this.props.todoItem.id}`)
                .then(response => {
                    this.props.getTodoItems()
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
    render() {
        const { todoItem } = this.props
        return (
            <tr
                className={`${
                    todoItem.complete && this.props.hideCompletedTodoItems
                        ? `d-none`
                        : null
                } ${todoItem.complete ? 'table-light' : null}`}
            >
                <td>
                    <svg
                        className={`bi bi-check-circle ${
                            todoItem.complete ? `text-success` : `text-muted`
                        }`}
                        width="2em"
                        height="2em"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M17.354 4.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L10 11.293l6.646-6.647a.5.5 0 01.708 0z"
                            clipRule="evenodd"
                        ></path>
                        <path
                            fillRule="evenodd"
                            d="M10 4.5a5.5 5.5 0 105.5 5.5.5.5 0 011 0 6.5 6.5 0 11-3.25-5.63.5.5 0 11-.5.865A5.472 5.472 0 0010 4.5z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </td>
                <td>
                    <input
                        type="text"
                        value={todoItem.title}
                        disabled={todoItem.complete}
                        onChange={this.handleChange}
                        ref={this.inputRef}
                        className="form-control"
                    />
                </td>
                <td className="text-right">
                    <div className="form-check form-check-inline">
                        <input
                            type="boolean"
                            checked={todoItem.complete}
                            type="checkbox"
                            onChange={this.handleChange}
                            ref={this.completedRef}
                            className="form-check-input"
                            id={`complete-${todoItem.id}`}
                        />
                        <label
                            className="form-check-label"
                            htmlFor={`complete-${todoItem.id}`}
                        >
                            Complete?
                        </label>
                    </div>
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
    getTodoItems: PropTypes.func.isRequired,
    hideCompletedTodoItems: PropTypes.bool.isRequired,
}
