
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    window.localStorage.clear()
    client.resetStore()
  }

  useEffect(() => {
    const storageToken = window.localStorage.getItem('library-user')
    if(storageToken) {
      setToken(storageToken)
    }
  }, [setToken])

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && (
          <button onClick={() => setPage('add')}>add book</button>
        )}
        {token && (
          <button onClick={() => setPage('recommend')}>Recommendations</button>
        )}
        {token && (
          <button style={{float:'right'}} onClick={logout}>logout</button>
        )}
        {!token && (
          <button style={{float:'right'}} onClick={() => setPage('login')} >login</button>
        )}
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        token={token}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />

      <Recommend
        token={token}
        show={page === 'recommend'}
      />

    </div>
  )
}

export default App