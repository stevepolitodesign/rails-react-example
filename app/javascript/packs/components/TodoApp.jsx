import React from 'react'
import ReactDOM from 'react-dom'

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
        }
        this.createTodoItem = this.createTodoItem.bind(this)
        this.updateTodoItem = this.updateTodoItem.bind(this)
        this.handleErrors = this.handleErrors.bind(this)
        this.clearErrors = this.clearErrors.bind(this)
        this.getToDoItems = this.getToDoItems.bind(this)
    }

    componentDidMount() {
        this.getToDoItems()
    }

    // TODO: Maybe use Axios fot better compatibility
    async getToDoItems() {
        try {
            this.setState({ isLoading: true })
            const response = await fetch('/api/v1/todo_items')
            const todoItems = await response.json()
            this.setState({ todoItems })
            this.setState({ isLoading: false })
        } catch (error) {
            // Display errors
            console.log(error)
        }
    }

    createTodoItem(todoItem) {
        const todoItems = [todoItem, ...this.state.todoItems]
        this.setState({ todoItems })
    }

    updateTodoItem(updatedTodoItem) {
        const { id } = updatedTodoItem
        const todoItems = [...this.state.todoItems]
        const todoItemIndex = todoItems.findIndex(
            todoItem => todoItem.id === id
        )
        todoItems[todoItemIndex] = { ...updatedTodoItem }
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
                    <TodoItems>
                        {this.state.todoItems.map(todoItem => (
                            <TodoItem
                                key={todoItem.id}
                                todoItem={todoItem}
                                updateTodoItem={this.updateTodoItem}
                                handleErrors={this.handleErrors}
                                clearErrors={this.clearErrors}
                                getToDoItems={this.getToDoItems}
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
    ReactDOM.render(<TodoApp />, document.getElementById('todo-app'))
})
