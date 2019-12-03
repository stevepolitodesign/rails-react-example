import React from 'react'
import PropTypes from 'prop-types'

class TodoItem extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.inputRef = React.createRef();
    }
    handleChange(e) {
        console.log(e);
    }
    render(){
        const {id, title, complete } = this.props.todo_item
        return (
            <div index={id}>
                <input type="text" value={title} ref={this.inputRef} onChange={this.handleChange} />
                <label>
                    Complete:
                    <input type="boolean" checked={complete} type="checkbox" />
                </label>
            </div>
        )   
    }
}

export default TodoItem

TodoItem.propTypes = {
    todo_item: PropTypes.object.isRequired
};