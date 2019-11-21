import React from 'react'
import PropTypes from 'prop-types'

const TodoItem = (props) => {
    const {id, title, complete } = props.todo_item
    return (
        <div index={id}>
            <input type="text" value={title} />
            <label>
                Complete:
                <input type="boolean" checked={complete} type="checkbox" />
            </label>
        </div>
    )
}

export default TodoItem

TodoItem.propTypes = {
    todo_item: PropTypes.object.isRequired
};