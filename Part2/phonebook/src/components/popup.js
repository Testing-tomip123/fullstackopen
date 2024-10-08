import React from 'react'

const PopUp = ({ message }) => {
    if (message === null) {
        return null
    }
    if (message.includes('Added') || message.includes('Updated')) {
        return (
            <div className="confirmation">
                <p>{message}</p>
            </div>
        )
    }
        
    else {
        return (
            <div className="errorMessage">
                <p>{message}</p>
            </div>
        )
    }
}

export default PopUp