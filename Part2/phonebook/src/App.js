import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    var isUnique = persons.every(person => person.name !== newName)
    if (isUnique) {

    const newPerson = {
      name: newName,
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) =>
          <li key={index}>{person.name}</li>
        )}
      </ul>
    </div>
  )
}


export default App