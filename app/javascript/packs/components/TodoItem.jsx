import React from 'react'
import PropTypes from 'prop-types'

const TodoItem = (props) => {
    const {id, title } = props.todo_item
    return (
        <div index={id}>{title}</div>
    )
}

export default TodoItem

TodoItem.propTypes = {
    todo_item: PropTypes.object.isRequired
};