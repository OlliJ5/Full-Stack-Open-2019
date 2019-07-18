import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return (
      null
    )
  } else if (message === 'Käyttäjän tiedot on jo poistettu') {
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