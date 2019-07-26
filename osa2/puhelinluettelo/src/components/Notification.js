import React from 'react'

const Notification = ({message, style}) => {
  if (message === null) {
    return (
      null
    )
  } else if (style === 'error') {
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  return (
    <div className="success">
      {message}
    </div>
  )
}

export default Notification