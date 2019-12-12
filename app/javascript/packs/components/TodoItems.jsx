import React from 'react'

const TodoItems = ({ children }) => {
    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">To Do</th>
                        <th scope="col">Complete</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>{children}</tbody>
            </table>
        </div>
    )
}

export default TodoItems
