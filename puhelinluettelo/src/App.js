import { useState } from 'react'

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

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id:1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id:2 },
    { name: 'Dan Abramov', number: '12-43-234345', id:3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id:4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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