import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState('all genres')
  const books = useQuery(ALL_BOOKS)

  if (!props.show || books.loading) {
    return null
  }

  const selectDropDown = (event) => {
    console.log('valitaan', event.target.value)
    setSelectedGenre(event.target.value)
  }

  const genres = books.data.allBooks.map(b => b.genres)
  const options = ['all genres'].concat(...genres)
  const uniqueOptions = [...new Set(options)]

  const booksToShow = selectedGenre === 'all genres' ? books.data.allBooks
    : books.data.allBooks.filter(b => b.genres.includes(selectedGenre))

  return (
    <div>
      <h2>books</h2>
      <h2>Genres</h2>
      <select value={selectedGenre} onChange={selectDropDown}>
        {uniqueOptions.map(o =>
          <option key={o} value={o}>{o}</option>
        )}
      </select>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToShow.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books