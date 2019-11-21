import React from 'react'
import PropTypes from 'prop-types'

const TodoForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <input type="text" name="title" required />
            <button>Add To Do Item</button>
        </form>
    )
}

export default TodoForm

TodoForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};