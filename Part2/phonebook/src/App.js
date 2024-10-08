import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Personfetch from './components/personFetch'
import PopUp from './components/popup'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    Personfetch.fetchAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const deletePersonFromServer = (event) => {
    event.preventDefault()
    const id = (event.target.value)
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      Personfetch.remove(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.log(error)
          setMessage(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    var isUnique = persons.every(person => person.name !== newName)
    if (isUnique) {

    const newPerson = {
      name: newName,
      number: newNumber
    }
    
    Personfetch.create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setMessage(`Added ${newPerson.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)

      })
      .catch(error => {
        console.log(error.response.data.error)
        setMessage(`${JSON.stringify(error.response.data.error)}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      
      
      
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const id = persons.find(person => person.name === newName).id
        const newPerson = {
          name: newName,
          number: newNumber
        }
        Personfetch.update(newPerson, id)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            setMessage(`Updated ${newName}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          }
        )
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <PopUp message={message} />
      <Filter name={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePersonFromServer} />
    </div>
  )
}


export default App