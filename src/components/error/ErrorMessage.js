import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message }) => {
    return (
        <div className="error-message__wp">
            <h6 className="error-message">{message}</h6>
        </div>
    )
}

export default ErrorMessage;
