
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
  const [name, setName] = useState('')
  const [born, setBorn] = useState(0)

  const [updateBirthYear] = useMutation(CHANGE_YEAR_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const authors = useQuery(ALL_AUTHORS)

  if (!props.show || authors.loading) {
    return null
  }

  const changeYearBorn = (event) => {
    event.preventDefault()
    console.log('vuosi', born)
    console.log('nimi', name)

    updateBirthYear({ variables: { name, setBornTo: Number(born) } })
      .then(res => {
        console.log('päivitetty', res)
      })

    setName('')
    setBorn(0)
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
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
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
