const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = ({name, exercises}) => {
  return (
    <div>
      <p>
        {name} {exercises}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map(part => <Part key={part.name} name={part.name} exercises={part.exercises} />)}
    </div>
  )
}


const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.parts.reduce((sum, part) => sum + part.exercises, 0)}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App