import { useState, useEffect } from 'react'
import personSV from './services/persons'
import './index.css'
import Notification from './components/Notification'
import Form from './components/Form'

/*                      COMPONENTS                            */

const Person = props => { 
 return ( <p>{props.name} {props.number} 
              <button onClick={props.buttonFunc}>delete</button>
          </p> 
  )
}

const Header = props => <h1>{props.text}</h1>

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


/*                      /COMPONENTS                            */

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    personSV
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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
        setError(`Added ${returnedPerson.name}`, 5000)
        setNewName('')
        setNewNumber('')
      })
    } else {
      if (window.confirm(`${duplicate.name} is already added to the phonebook, do you want to 
        replace the existing number with a new one?`)) {
        updatePerson(duplicate)
      } else {
          setError('Update cancelled by user', 5000)
          setNewName('')
          setNewNumber('')
      }
    }
  }

  const setError = (message, time) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage('')
    }, time)
  }

  const updatePerson = (person) => {
    const newPerson = { ...person, number: newNumber }
    const id = person.id
    personSV
      .update(id, newPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setNewName('')
        setNewNumber('')
        setError(`Updated the phone number of ${returnedPerson.name}`, 5000)
    })
    .catch(error => {
      setError(`error in updating ${newPerson.name}, data already deleted`, 5000)
      setPersons(persons.filter(p => p.id !== newPerson.id))
    })
  }

  const deletePerson = (id) => {
    const delPerson = persons.find(person => person.id === id ? person : '')
    console.log(delPerson)
    if (window.confirm(`Delete the user ${delPerson.name}?`))
    {
      personSV.deleteP(id)
      personSV
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
        .catch(error => {
          setError(`error, something went wrong removing ${delPerson.name}`, 5000)
          setPersons(persons.filter(p => p.id !== id))
        })
      setError(`User ${delPerson.name} removed`, 5000)
    }
  }

  // Event handlers
  const handlePersonChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)
  const handleFilterChange = event => setFilter(event.target.value)

  return (
    <div>
      <Header text="Phonebook"/>
      <Notification message={errorMessage} />
      <Filter text="filter shown with: " value={filter} func={handleFilterChange} />
      <Header text="Add new"/>
      <Form submitAction={addPerson} nameInput={newName} nameChange={handlePersonChange}
            numberInput={newNumber} numberChange={handleNumberChange}  />
      <Header text="Numbers"/>
      <ul>
        {persons.map(person => person.name.toLowerCase().includes(filter) ?
          <Person
            key={person.id}
            name={person.name}
            number={person.number}
            buttonFunc={() => deletePerson(person.id)}
          /> : null
        )}
      </ul>
    </div>
  )

}

export default App