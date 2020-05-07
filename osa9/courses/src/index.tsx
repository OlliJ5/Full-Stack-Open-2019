import React from "react";
import ReactDOM from "react-dom";

const Header: React.FC<{ name: string }> = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseWithDesc extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartBaseWithDesc {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseWithDesc {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBaseWithDesc {
  name: "Nice part";
  pagesToRead: number;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case "Fundamentals":
      return (
        <div>
          <p>
            {part.name} {part.exerciseCount} {part.description}
          </p>
        </div>
      )
    case "Using props to pass data":
      return (
        <div>
          <p>
            {part.name} {part.exerciseCount} {part.groupProjectCount}
          </p>
        </div>
      )
    case "Deeper type usage":
      return (
        <div>
          <p>
            {part.name} {part.exerciseCount} {part.description} {part.exerciseSubmissionLink}
          </p>
        </div>
      )
    case "Nice part":
      return (
        <div>
          <p>
            {part.name} {part.exerciseCount} {part.description} {part.pagesToRead}
          </p>
        </div>
      )
    default:
      return null
  }
}

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map(part =>
        <Part key={part.name} part={part} />
      )}
    </div>
  )
}

const Total: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  )
}

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Nice part",
      exerciseCount: 1337,
      description: "Very nice",
      pagesToRead: 5
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
