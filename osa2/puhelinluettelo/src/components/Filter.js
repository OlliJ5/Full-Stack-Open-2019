import React from 'react'

const Filter = ({filter, handleFilterChange}) => {
  return (
    <div>
      filter: <input value={filter}
        onChange={handleFilterChange}
      />
    </div>
  )
}

export default Filter