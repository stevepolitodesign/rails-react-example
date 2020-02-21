import React from 'react'
import PropTypes from 'prop-types'

import _ from 'lodash'

const ErrorMessage = props => {
    const data = _.get(props.errorMessage, 'response.data', null)
    const message = _.get(props.errorMessage, 'message', null)
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
