import React from 'react'

const PopUp = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className="confirmation">{message}</div>
    )
}

export default PopUp