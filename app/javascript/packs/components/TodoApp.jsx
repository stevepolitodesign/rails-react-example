import React from 'react'
import ReactDOM from 'react-dom'

import ErrorMessage from './ErrorMessage'
import TodoForm from './TodoForm'
import TodoItem from './TodoItem'
class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        todoItems: [],
        errorMessage: null
    };
    this.createTodoItem = this.createTodoItem.bind(this);
    this.updateTodoItem = this.updateTodoItem.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
  }

  componentDidMount() {
    this.getToDoItems();
  }

  async getToDoItems() {
    try {
      const response = await fetch('/api/v1/todo_items');
      const todoItems = await response.json();
      this.setState({todoItems})
    } catch (error) {
      console.log(error);
    }
  }

  createTodoItem(todoItem) {
    // TODO: Update sort order
    const todoItems = [todoItem, ...this.state.todoItems]
    this.setState({todoItems})
  }

  updateTodoItem(todoItem) {
    const { id, title, complete, updated_at } = todoItem;
    const todoItems = [...this.state.todoItems];
    const todoItemIndex = todoItems.findIndex(todoItem => todoItem.id === id);
    // TODO: clean this up
    todoItems[todoItemIndex].title = title;
    todoItems[todoItemIndex].complete = complete;
    todoItems[todoItemIndex].updated_at = updated_at;
    this.setState({todoItems});
  }

  handleErrors(errorMessage) {
    this.setState({errorMessage})
  }

  clearErrors() {
    this.setState({
      errorMessage: null
    })
  }

  render() {
    return (
      <>
        {this.state.errorMessage && <ErrorMessage errorMessage={this.state.errorMessage}/>}
        <TodoForm createTodoItem={this.createTodoItem} handleErrors={this.handleErrors} clearErrors={this.clearErrors}/>
        { this.state.todoItems.map( todoItem => <TodoItem key={todoItem.id} todoItem={todoItem} updateTodoItem={this.updateTodoItem} handleErrors={this.handleErrors} clearErrors={this.clearErrors}/>) }
      </>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <TodoApp />,
    document.getElementById('todo-app')
  )
})