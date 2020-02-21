import React from 'react'
import PropTypes from 'prop-types'

import axios from 'axios'
import setAxiosHeaders from './AxiosHeaders'
class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.titleRef = React.createRef()
    }

    handleSubmit(e) {
        e.preventDefault()
        setAxiosHeaders()
        axios
            .post('/api/v1/todo_items', {
                todo_item: {
                    title: this.titleRef.current.value,
                    complete: false,
                },
            })
            .then(response => {
                const todoItem = response.data
                this.props.createTodoItem(todoItem)
                this.props.clearErrors()
            })
            .catch(error => {
                this.props.handleErrors(error)
            })
        e.target.reset()
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="my-3">
                <div className="form-row">
                    <div className="form-group col-md-8">
                        <input
                            type="text"
                            name="title"
                            ref={this.titleRef}
                            required
                            className="form-control"
                            id="title"
                            placeholder="Write your todo item here..."
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <button className="btn btn-outline-success btn-block">
                            Add To Do Item
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

export default TodoForm

TodoForm.propTypes = {
    createTodoItem: PropTypes.func.isRequired,
    handleErrors: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
}
