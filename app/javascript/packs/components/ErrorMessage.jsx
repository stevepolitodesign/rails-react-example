import React from 'react'
import PropTypes from 'prop-types'

const ErrorMessage = (props) => {
    const { data } = props.errorMessage.response;
    const keys = Object.keys(data);
    keys.forEach((key)=>{
        console.log(key)
        data[key].forEach((message)=>{
            console.log(message);
        })
    })
    return(
        keys.map((item) => {
            <p>{item}</p>
        })
    )
}

export default ErrorMessage;

ErrorMessage.propTypes = {
    errorMessage: PropTypes.object.isRequired
}