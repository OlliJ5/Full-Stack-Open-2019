import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <tr><Statistic text={'Good'} value={good} /></tr>
          <tr><Statistic text={'Neutral'} value={neutral} /></tr>
          <tr><Statistic text={'Bad'} value={bad} /></tr>
          <tr><Statistic text={'All'} value={good + neutral + bad} /></tr>
          <tr><Statistic text={'Average'} value={(good - bad) / (good + neutral + bad)} /></tr>
          <tr><Statistic text={'Positive'} value={good / (good + neutral + bad) * 100 + '%'} /></tr>
        </tbody>
      </table>
    </>
  )
}

const Statistic = ({ text, value }) => (
  <>
    <td>{text}</td>
    <td>{value}</td>
  </>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Unicafe</h1>
      <h2>Give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text={'Good'} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={'Neutral'} />
      <Button handleClick={() => setBad(bad + 1)} text={'Bad'} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)