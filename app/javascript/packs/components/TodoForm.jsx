import React from 'react'
import PropTypes from 'prop-types'

import axios from 'axios'
import setAxiosHeaders from './AxiosHeaders'
class TodoForm extends React.Component {

    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.titleRef = React.createRef();
        this.formRef = React.createRef();
    }

    handleSubmit(e) {
        e.preventDefault();
        setAxiosHeaders();
        axios.post('/api/v1/todo_items', {
          todo_item: {
            title: this.titleRef.current.value,
            complete: false
          }
        })
        .then( (response) => {
          const todoItem = response.data
          this.props.addTodoItem(todoItem)
        })
        .catch((error) => {
          // TODO handle this
          console.log(error);
        });
        e.target.reset();
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