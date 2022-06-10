import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={`notification notification-${message.type}`}>
      {message.content}
    </div>
  )
}

export default Notification