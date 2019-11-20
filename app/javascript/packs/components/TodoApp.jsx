import React from 'react'
import ReactDOM from 'react-dom'
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
      <ul>
          { this.state.todo_items.map( todo_item => <li key={todo_item.id}>{todo_item.title}</li>) }
      </ul>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <TodoApp />,
    document.getElementById('todo-app')
  )
})