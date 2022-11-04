const Header = props => <h1>{props.text}</h1>

const Courses = (props) => {
  console.log(props)
  return (
    <div>
      {props.courses.map(each => <Course key={each.id} course={each} /> )}
    </div>
  )
}

const Course = (props) => {
  const {name, parts} = props.course
  return (
    <div>
      <Title text={name} />
      <Content parts={parts} />
      <TotalExercises parts={parts}/>
    </div>
  )
}

const Title = (props) => {
  return (
    <h2>{props.text}</h2>
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

const TotalExercises = (props) => {
  let exs = 0;
  exs = props.parts.map(each => each.exercises)
  const sum = exs.reduce((x,y) => x + y)
  return (
    <div>
      <strong><p>total of {sum} exercises</p></strong>
    </div>
  )
}

const App = () => {
  const header = 'Web development curriculum'
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Header text={header}/>
      <Courses courses={courses} />
    </div>
  )
}

export default App