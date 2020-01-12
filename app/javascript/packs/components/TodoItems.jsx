import React from 'react'
import PropTypes from 'prop-types'
class TodoItems extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        this.props.toggleCompletedTodoItems()
    }
    render() {
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">To Do</th>
                            <th scope="col">
                                <button onClick={this.handleClick}>
                                    Complete
                                </button>
                            </th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>{this.props.children}</tbody>
                </table>
            </div>
        )
    }
}
export default TodoItems

TodoItems.propTypes = {
    toggleCompletedTodoItems: PropTypes.func.isRequired,
}
