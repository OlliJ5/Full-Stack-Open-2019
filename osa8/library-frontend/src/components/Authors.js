
import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const CHANGE_YEAR_BORN = gql`
  mutation changeYear($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name
      setBornTo: $setBornTo
    ) {
      name
      born
    }
  }
`

const Authors = (props) => {
  const [born, setBorn] = useState(0)
  const [selected, setSelected] = useState('')

  const [updateBirthYear] = useMutation(CHANGE_YEAR_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const authors = useQuery(ALL_AUTHORS)

  if (!props.show || authors.loading) {
    return null
  }

  const changeYearBorn = (event) => {
    event.preventDefault()

    updateBirthYear({ variables: { name: selected, setBornTo: Number(born) } })
      .then(res => {
        console.log('päivitetty', res)
      })

    setBorn(0)
  }

  const selectDropDown = (event) => {
    setSelected(event.target.value)
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={changeYearBorn}>
        <div>
          name
          <select value={selected} onChange={selectDropDown}>
            {authors.data.allAuthors.map(a => 
              <option key={a.name} value={a.name}>{a.name}</option>  
            )}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            type='number'
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>change birthyear</button>
      </form>
    </div>
  )
}

export default Authors
