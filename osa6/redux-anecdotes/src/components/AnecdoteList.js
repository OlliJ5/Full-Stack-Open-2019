import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.store.getState().anecdotes
  const orederedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  const anecdotesToShow = orederedAnecdotes
    .filter(anecdote =>
      anecdote.content.toLowerCase().includes(props.store.getState().filter.toLowerCase()))

  const vote = (anecdote) => {
    props.store.dispatch(voteAnecdote(anecdote.id))
    props.store.dispatch(notificationChange(`You voted for anecdote ${anecdote.content}`))
    setTimeout(() => {
      props.store.dispatch(notificationChange(null))
    }, 5000)
  }


  return (
    <div>
      {anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList