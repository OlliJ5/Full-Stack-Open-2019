import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const vote = (anecdote) => {
    props.voteAnecdote(anecdote.id)
    props.notificationChange(`You voted for anecdote ${anecdote.content}`)
    setTimeout(() => {
      props.notificationChange(null)
    }, 5000)
  }

  return (
    <div>
      {props.anecdotesToShow.map(anecdote =>
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

const anecdotesToShow = ({ anecdotes, filter }) => {
  const orederedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  const anecdotesToShow = orederedAnecdotes
    .filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase()))

  return anecdotesToShow
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: anecdotesToShow(state),
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  notificationChange
}

const connectedAnecdoteList = connect(
  mapStateToProps, mapDispatchToProps
)(AnecdoteList)
export default connectedAnecdoteList