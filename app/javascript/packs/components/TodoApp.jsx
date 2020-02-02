import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import ErrorMessage from './ErrorMessage'
import TodoForm from './TodoForm'
import TodoItems from './TodoItems'
import TodoItem from './TodoItem'
import Spinner from './Spinner'
class TodoApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            todoItems: [],
            errorMessage: null,
            isLoading: null,
            hideCompletedTodoItems: false,
        }
        this.createTodoItem = this.createTodoItem.bind(this)
        this.handleErrors = this.handleErrors.bind(this)
        this.clearErrors = this.clearErrors.bind(this)
        this.getTodoItems = this.getTodoItems.bind(this)
        this.toggleCompletedTodoItems = this.toggleCompletedTodoItems.bind(this)
    }

    componentDidMount() {
        this.getTodoItems()
    }

    async getTodoItems() {
        axios
            .get('/api/v1/todo_items')
            .then(response => {
                this.clearErrors()
                this.setState({ isLoading: true })
                const todoItems = response.data
                this.setState({ todoItems })
                this.setState({ isLoading: false })
            })
            .catch(error => {
                this.setState({ isLoading: true })
                this.setState({
                    errorMessage: {
                        message:
                            'There was an error loading your todo items...',
                    },
                })
            })
    }

    toggleCompletedTodoItems() {
        this.setState({
            hideCompletedTodoItems: !this.state.hideCompletedTodoItems,
        })
    }

    createTodoItem(todoItem) {
        const todoItems = [todoItem, ...this.state.todoItems]
        this.setState({ todoItems })
    }

    handleErrors(errorMessage) {
        this.setState({ errorMessage })
    }

    clearErrors() {
        this.setState({
            errorMessage: null,
        })
    }

    render() {
        return (
            <>
                {this.state.errorMessage && (
                    <ErrorMessage errorMessage={this.state.errorMessage} />
                )}
                <TodoForm
                    createTodoItem={this.createTodoItem}
                    handleErrors={this.handleErrors}
                    clearErrors={this.clearErrors}
                />
                {!this.state.isLoading && (
                    <TodoItems
                        toggleCompletedTodoItems={this.toggleCompletedTodoItems}
                        hideCompletedTodoItems={
                            this.state.hideCompletedTodoItems
                        }
                    >
                        {this.state.todoItems.map(todoItem => (
                            <TodoItem
                                key={todoItem.id}
                                todoItem={todoItem}
                                handleErrors={this.handleErrors}
                                clearErrors={this.clearErrors}
                                getTodoItems={this.getTodoItems}
                                hideCompletedTodoItems={
                                    this.state.hideCompletedTodoItems
                                }
                            />
                        ))}
                    </TodoItems>
                )}
                {this.state.isLoading && <Spinner />}
            </>
        )
    }
}

document.addEventListener('turbolinks:load', () => {
    const app = document.getElementById('todo-app')
    app && ReactDOM.render(<TodoApp />, app)
})
