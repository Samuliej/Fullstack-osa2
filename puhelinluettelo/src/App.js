import { useState, useEffect } from 'react'
import personSV from './services/persons'

/*                      COMPONENTS                            */

const Person = props => <p>{props.name} {props.number}</p>
const Header = props => <h2>{props.text}</h2>

const Filter = props => {
  return (
    <Input values={props}/>
  )
}

const Input = (props) => {
  const {text, value, func} = props.values
  return (
    <div>
      {text} <input 
        value={value}
        onChange={func}
      />
    </div>
  )
}

const Form = props => {
  return (
    <form onSubmit={props.submitAction}>
    <div>
      name: <input 
            value={props.nameInput}
            onChange={props.nameChange}
            />
            <br/>
      number: <input
            value={props.numberInput}
            onChange={props.numberChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = props => {
  return (
    <div>
    {props.arr.map(person => person.name.toLowerCase().includes(props.filt) ?
      <Person key={person.id} name={person.name} number={person.number} /> : null ) }
  </div>
  )
}

/*                      /COMPONENTS                            */

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personSV
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])


  const addPerson = (event) => {
    let duplicate;
    duplicate = persons.find(person => person.name === newName)
    event.preventDefault()
    if (!duplicate) {
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    personSV
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    } else
        alert(`${newName} is already added to the phonebook`)
  }

  // Event handlers
  const handlePersonChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)
  const handleFilterChange = event => setFilter(event.target.value)

  return (
    <div>
      <Header text="Phonebook"/>
      <Filter text="filter shown with: " value={filter} func={handleFilterChange} />
      <Header text="Add new"/>
      <Form submitAction={addPerson} nameInput={newName} nameChange={handlePersonChange}
            numberInput={newNumber} numberChange={handleNumberChange}  />
      <Header text="Numbers"/>
      <Persons arr={persons} filt={filter} />
    </div>
  )

}

export default App