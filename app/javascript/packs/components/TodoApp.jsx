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

    // I run this to verify if the todoItems updated after calling updateTodoItem()
    componentDidUpdate() {
        console.log(this.state.todoItems)
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
        // The following didn't work

        /* 
        Option 1
        `todoItems[todoItemIndex] = { ...todoItem }`

        Option 2
        `todoItems[todoItemIndex] = todoItem`


        Option 3
        this.setState(state => {
            todoItems: state.todoItems.map(item => {
                if (item.id === todoItem.id) {
                    item = { ...todoItem }
                }
                return item
            })
        })
        */

        // todoItems[todoItemIndex].title = title
        // todoItems[todoItemIndex].complete = complete
        // todoItems[todoItemIndex].updated_at = updated_at
        // this.setState({ todoItems })
        todoItems[todoItemIndex] = { ...todoItem }
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
                {this.state.todoItems.length === 0 && <Spinner />}
            </>
        )
    }
}

document.addEventListener('turbolinks:load', () => {
    ReactDOM.render(<TodoApp />, document.getElementById('todo-app'))
})
