import React from 'react'
import PropTypes from 'prop-types'

const ErrorMessage = props => {
    const { message } = props.errorMessage
    const { data } = props.errorMessage.response
    if (data) {
        const keys = Object.keys(data)
        return keys.map(key => {
            return (
                <div
                    key={new Date()}
                    className="alert alert-danger"
                    role="alert"
                >
                    <p>{key}</p>
                    <ul>
                        <li>{data[key].map(message => message)}</li>
                    </ul>
                </div>
            )
        })
    } else if (message) {
        return (
            <div className="alert alert-danger" role="alert">
                <p className="mb-0">{message}</p>
            </div>
        )
    } else {
        return (
            <div className="alert alert-danger" role="alert">
                <p className="mb-0">There was an error.</p>
            </div>
        )
    }
}

export default ErrorMessage

ErrorMessage.propTypes = {
    errorMessage: PropTypes.object.isRequired,
}
