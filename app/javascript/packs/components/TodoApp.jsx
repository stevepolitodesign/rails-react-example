import React from 'react'
import ReactDOM from 'react-dom'

import TodoForm from './TodoForm'
import TodoItem from './TodoItem'


class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        todo_items: [],
        user: {}
      };
    this.handleSubmit = this.handleSubmit.bind(this);
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



  handleSubmit(e) {
    e.preventDefault();
    console.log(e)
  }

  render() {
    return (
      <>
        <TodoForm handleSubmit={this.handleSubmit} />
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