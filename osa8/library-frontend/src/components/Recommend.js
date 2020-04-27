import React from 'react'
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

const ME = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`

const Recommend = (props) => {
  const books = useQuery(ALL_BOOKS)
  const user = useQuery(ME)

  console.log('token', props.token)
  console.log('useri', user.data)

  if (!props.show || books.loading || user.loading || !user.data.me) {
    return null
  }

  const fav = user.data.me.favoriteGenre
  const booksToShow = books.data.allBooks.filter(b => b.genres.includes(fav))

  return (
    <div>
      <h2>Books in your favorite genre ({fav}):</h2>
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

export default Recommend