import React from 'react'
import PropTypes from 'prop-types'

const ToDdoItem = (props) => {
    const {id, title } = props.todo_item
    return (
        <div key={id}>{title}</div>
    )
}

export default ToDdoItem

ToDdoItem.propTypes = {
    todo_item: PropTypes.object.isRequired
};