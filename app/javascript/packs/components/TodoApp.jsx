import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import TodoForm from './TodoForm'
import TodoItem from './TodoItem'

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        todo_items: [],
        current_user: {}
      };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getToDoItem();
    this.getCurrentUser();
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

  async getCurrentUser() {
    try {
      const response = await fetch('/api/v1/current_user');
      const current_user = await response.json();
      this.setState({current_user})
    } catch (error) {
      console.log(error);
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    // https://medium.com/@zayneabraham/ruby-on-rails-csrf-protection-with-react-js-65dd84b8edad
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    axios.post('/api/v1/todo_items', {
      todo_item: {
        title: 'a hard coded to do item',
        complete: false,
        user_id: 1
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    // Make Post Request to /api/v1/todo_items
      // Use these values todo_item[title], todo_item[complete], complete[user_id]
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