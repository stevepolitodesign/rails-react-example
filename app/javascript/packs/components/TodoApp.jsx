import React from 'react'
import ReactDOM from 'react-dom'

import ErrorMessage from './ErrorMessage'
import TodoForm from './TodoForm'
import TodoItem from './TodoItem'
class TodoApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            todoItems: [],
            errorMessage: null,
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
            const response = await fetch('/api/v1/todo_items')
            const todoItems = await response.json()
            this.setState({ todoItems })
        } catch (error) {
            // Display errors
            console.log(error)
        }
    }

    createTodoItem(todoItem) {
        const todoItems = [todoItem, ...this.state.todoItems]
        this.setState({ todoItems })
    }

    updateTodoItem(todoItem) {
        const { id, title, complete, updated_at } = todoItem
        const todoItems = [...this.state.todoItems]
        const todoItemIndex = todoItems.findIndex(
            todoItem => todoItem.id === id
        )
        // TODO: clean this up
        // This doesn't work `todoItems[todoItemIndex] = { ...todoItem }`, nor does this `todoItems[todoItemIndex] = todoItem`
        todoItems[todoItemIndex].title = title
        todoItems[todoItemIndex].complete = complete
        todoItems[todoItemIndex].updated_at = updated_at
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
                {this.state.todoItems.length !== 0 && (
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">To Do</th>
                                    <th scope="col">Complete</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
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
                            </tbody>
                        </table>
                    </div>
                )}
                {this.state.todoItems.length === 0 && (
                    <div className="d-flex align-items-center justify-content-center py-5">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )}
            </>
        )
    }
}

document.addEventListener('turbolinks:load', () => {
    ReactDOM.render(<TodoApp />, document.getElementById('todo-app'))
})
