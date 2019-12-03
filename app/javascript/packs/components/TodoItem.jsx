import React from 'react'
import PropTypes from 'prop-types'

import axios from 'axios'
import setAxiosHeaders from './AxiosHeaders'

class TodoItem extends React.Component {
    constructor(props) {
        super(props)
        this.todo_item = this.props.todo_item
        this.handleChange = this.handleChange.bind(this);
        this.inputRef = React.createRef();
        this.completedRef = React.createRef();
    }
    handleChange(e) {
        setAxiosHeaders();
        axios.put(`/api/v1/todo_items/${this.todo_item.id}`, {
          todo_item: {
            title: 'UPDATED TITLE',
            complete: true
          }
        })
        .then( (response) => {
            console.log(response);
        })
        .catch((error) => {
          // TODO handle this
          console.log(error);
        });        
    }
    render(){
        const { id, title, complete } = this.todo_item;
        return (
            <div index={id}>
                <input type="text" value={title} onChange={this.handleChange} ref={this.inputRef} />
                <label>
                    Complete:
                    <input type="boolean" checked={complete} type="checkbox" onChange={this.handleChange} ref={this.completedRef} />
                </label>
            </div>
        )   
    }
}

export default TodoItem

TodoItem.propTypes = {
    todo_item: PropTypes.object.isRequired
};