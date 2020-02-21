import React from 'react'
import PropTypes from 'prop-types'

import _ from 'lodash'
import axios from 'axios'
import setAxiosHeaders from './AxiosHeaders'
class TodoItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            complete: this.props.todoItem.complete,
        }
        this.handleDestroy = this.handleDestroy.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.updateTodoItem = this.updateTodoItem.bind(this)
        this.inputRef = React.createRef()
        this.completedRef = React.createRef()
        this.path = `/api/v1/todo_items/${this.props.todoItem.id}`
    }
    handleChange() {
        this.setState({
            complete: this.completedRef.current.checked,
        })
        this.updateTodoItem()
    }
    updateTodoItem = _.debounce(() => {
        setAxiosHeaders()
        axios
            .put(this.path, {
                todo_item: {
                    title: this.inputRef.current.value,
                    complete: this.completedRef.current.checked,
                },
            })
            .then(() => {
                this.props.clearErrors()
            })
            .catch(error => {
                this.props.handleErrors(error)
            })
    }, 1000)
    handleDestroy() {
        setAxiosHeaders()
        const confirmation = confirm('Are you sure?')
        if (confirmation) {
            axios
                .delete(this.path)
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
                    this.state.complete && this.props.hideCompletedTodoItems
                        ? `d-none`
                        : ''
                } ${this.state.complete ? 'table-light' : ''}`}
            >
                <td>
                    <svg
                        className={`bi bi-check-circle ${
                            this.state.complete ? `text-success` : `text-muted`
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
                        defaultValue={todoItem.title}
                        disabled={this.state.complete}
                        onChange={this.handleChange}
                        ref={this.inputRef}
                        className="form-control"
                        id={`todoItem__title-${todoItem.id}`}
                    />
                </td>
                <td className="text-right">
                    <div className="form-check form-check-inline">
                        <input
                            type="boolean"
                            defaultChecked={this.state.complete}
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
    getTodoItems: PropTypes.func.isRequired,
    hideCompletedTodoItems: PropTypes.bool.isRequired,
    clearErrors: PropTypes.func.isRequired,
}
