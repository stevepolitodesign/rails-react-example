import React from 'react'
import ReactDOM from 'react-dom'

import TodoForm from './TodoForm'
import TodoItem from './TodoItem'
import { throws } from 'assert';
class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        todoItems: [],
    };
    this.addTodoItem = this.addTodoItem.bind(this);
    this.updateTodoItem = this.updateTodoItem.bind(this);
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

  addTodoItem(todoItem) {
    // TODO: Update sort order
    const todoItems = [todoItem, ...this.state.todoItems]
    this.setState({todoItems})
  }

  updateTodoItem(todoItem) {
    const { id, title, complete } = todoItem;
    const todoItems = [...this.state.todoItems];
    const todoItemIndex = todoItems.findIndex(todoItem => todoItem.id === id);
    // TODO: clean this up
    todoItems[todoItemIndex].title = title;
    todoItems[todoItemIndex].complete = complete;
    // TODO: add updated at
    this.setState({todoItems});
  }


  render() {
    return (
      <>
        <TodoForm addTodoItem={this.addTodoItem} />
        { this.state.todoItems.map( todoItem => <TodoItem key={todoItem.id} todoItem={todoItem} updateTodoItem={this.updateTodoItem} />) }
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