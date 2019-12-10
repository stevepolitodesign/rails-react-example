import React from 'react'
import PropTypes from 'prop-types'

const ErrorMessage = (props) => {
    const { data } = props.errorMessage.response;
    const keys = Object.keys(data);
    return(
        keys.map((key)=>{
            return (
                <div key={new Date()}>
                    <p>{key}</p>
                    <ul>
                        <li>{data[key].map( message => message)}</li>
                    </ul>
                </div>
            )
        })
    )
}

export default ErrorMessage;

ErrorMessage.propTypes = {
    errorMessage: PropTypes.object.isRequired
}