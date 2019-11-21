import React from 'react'
import ReactDOM from 'react-dom'

import TodoForm from './TodoForm'
import TodoItem from './TodoItem'
import { throws } from 'assert';
class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        todo_items: [],
        current_user: {}
    };
    this.addTodoItem = this.addTodoItem.bind(this);
  }

  componentDidMount() {
    this.getToDoItems();
    this.getCurrentUser();
  }

  async getToDoItems() {
    try {
      const response = await fetch('/api/v1/todo_items');
      const todo_items = await response.json();
      this.setState({todo_items})
    } catch (error) {
      console.log(error);
    }
  }

  async getCurrentUser() {
    try {
      const response = await fetch('/api/v1/current_user');
      const current_user = await response.json();
      this.setState({current_user})
    } catch (error) {
      console.log(error);
    }
  }

  addTodoItem(todoItem) {
    const todo_items = [todoItem, ...this.state.todo_items]
    this.setState({todo_items})
  }

  render() {
    return (
      <>
        <TodoForm currentUser={this.state.current_user} addTodoItem={this.addTodoItem} />
        { this.state.todo_items.map( todo_item => <TodoItem key={todo_item.id} todo_item={todo_item}/>) }
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