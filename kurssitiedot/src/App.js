
const Course = (props) => {
  const {name, parts} = props.course
  return (
    <div>
      <Header text={name} />
      <Content parts={parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}


const Content = (props) => {
  return (
    <div>
      <Part contents={props.parts}/>
    </div>
  )
} 

const Part = (props) => {
  return (
    <div>
      {props.contents.map(each => <p key={each.id}>{each.name} {each.exercises}</p>) }
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App