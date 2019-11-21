import React from 'react'
import PropTypes from 'prop-types'

import axios from 'axios'
class TodoForm extends React.Component {

    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.titleRef = React.createRef();
        this.currentUserRef = React.createRef();
        this.completeRef = React.createRef();
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(e);
        this.setAxiosHeaders();
        axios.post('/api/v1/todo_items', {
          todo_item: {
            title: this.titleRef.current.value,
            complete: false,
            user_id: this.props.currentUser.id
          }
        })
        .then( (response) => {
          const todoItem = response.data
          this.props.addTodoItem(todoItem);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setAxiosHeaders() {
        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit} >
                <input type="text" name="title" ref={this.titleRef} required />
                <button>Add To Do Item</button>
            </form>
        )    
    }

}

export default TodoForm

TodoForm.propTypes = {
    currentUser: PropTypes.object.isRequired
};