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
            hideCompletedTodoItems: false,
        }
        this.createTodoItem = this.createTodoItem.bind(this)
        this.updateTodoItem = this.updateTodoItem.bind(this)
        this.handleErrors = this.handleErrors.bind(this)
        this.clearErrors = this.clearErrors.bind(this)
        this.getTodoItems = this.getTodoItems.bind(this)
        this.toggleCompletedTodoItems = this.toggleCompletedTodoItems.bind(this)
        this.hideCompletedTodoItems = this.hideCompletedTodoItems.bind(this)
    }

    componentDidMount() {
        this.getTodoItems()
    }

    // TODO: Maybe use Axios fot better compatibility
    async getTodoItems() {
        try {
            this.setState({ isLoading: true })
            const response = await fetch('/api/v1/todo_items')
            const todoItems = await response.json()
            this.setState({ todoItems })
            this.setState({ isLoading: false })
        } catch (error) {
            // Display errors
            this.setState({ isLoading: true })
            console.log(error)
        }
    }

    toggleCompletedTodoItems() {
        this.setState({
            hideCompletedTodoItems: !this.state.hideCompletedTodoItems,
        })
        this.state.hideCompletedTodoItems
            ? this.hideCompletedTodoItems()
            : this.getTodoItems()
    }

    hideCompletedTodoItems() {
        this.setState({
            todoItems: this.state.todoItems.filter(
                todoItem => todoItem.complete === false
            ),
        })
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
                    <TodoItems
                        toggleCompletedTodoItems={this.toggleCompletedTodoItems}
                    >
                        {this.state.todoItems.map(todoItem => (
                            <TodoItem
                                key={todoItem.id}
                                todoItem={todoItem}
                                updateTodoItem={this.updateTodoItem}
                                handleErrors={this.handleErrors}
                                clearErrors={this.clearErrors}
                                getTodoItems={this.getTodoItems}
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
