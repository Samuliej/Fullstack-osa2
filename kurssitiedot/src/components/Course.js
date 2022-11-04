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

  export default Course