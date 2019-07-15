import React from 'react'


const Course = ({ course }) => {
    return (
      <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts.map(course => course.exercises)} />
      </>
    )
  }
  
  const Header = (props) => (
    <>
      <h2>{props.course}</h2>
    </>
  )
  
  const Content = (props) => {
    return (
      <>
        {props.parts.map(part =>
          <Part key={part.id} part={part.name} exercises={part.exercises} />
        )}
      </>
    )
  }
  
  const Part = (props) => (
    <>
      <p>{props.part} {props.exercises}</p>
    </>
  )
  
  const Total = (props) => {
    const reducer = (acc, current) => acc + current
    const totalExercises = props.parts.reduce(reducer)
    return (
      <>
        <p>Number of exercises {totalExercises}</p>
      </>
    )
  }

  export default Course