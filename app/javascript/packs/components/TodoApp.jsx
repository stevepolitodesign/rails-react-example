import React from 'react'
import ReactDOM from 'react-dom'

import TodoIem from './TodoItem';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todo_items: [] };
  }

  componentDidMount() {
    this.getToDoItem();
  }

  async getToDoItem() {
    try {
      const response = await fetch('/api/v1/todo_items');
      const todo_items = await response.json();
      this.setState({todo_items})
    } catch (error) {
      console.log(error);
    }

  }

  render() {
    return (
      <>
        { this.state.todo_items.map( todo_item => <TodoIem todo_item={todo_item}/>) }
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