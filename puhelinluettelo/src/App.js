import { useState } from 'react'

const Person = (props) => {
  console.log(props)
  return (
    <p>{props.name}</p>
  )
}

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      id: 1 
    }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    console.log('button clicked', event.target)
    console.log(newName)
    event.preventDefault()
    const personObject = {
      name: newName,
      id: persons.length + 1
    }

    setPersons(persons.concat(personObject))
    setNewName('')
  }

  console.log(persons)

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName}
            onChange={handlePersonChange}
          />
        </div>
        <div>debug: {newName}</div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
          {persons.map(person => <Person key={person.id} name={person.name} />) }
        </div>
    </div>
  )

}

export default App