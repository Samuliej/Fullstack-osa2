import Course from './components/Course'

const Header = props => <h1>{props.text}</h1>

const Courses = (props) => {
  return (
    <div>
      {props.courses.map(each => <Course key={each.id} course={each} /> )}
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