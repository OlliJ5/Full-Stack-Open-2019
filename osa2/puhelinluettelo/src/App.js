import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService.getAll()
      .then(res => {
        setPersons(res)
      })
  }, [])

  const addNumber = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.map(person => person.name).includes(newName)) {
      if (window.confirm(`${newName} is in the phonebook. Replace the number?`)) {
        const personId = persons.find(person => person.name === newName)
        personService.update(personId.id, personObject)
          .then(res => {
            setPersons(persons.map(person => person.id !== personId.id ? person : res))
          })
        setMessage(`Henkilön ${newName} numero päivitetty`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    } else {
      personService.create(personObject)
        .then(res => {
          setPersons(persons.concat(res))
        })
      setMessage(`Henkilö ${newName} lisätty puhelinluetteloon`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const removePerson = (id) => {
    if (window.confirm('Poistetaanko')) {
      personService.remove(id)
        .then(res => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setMessage('Käyttäjän tiedot on jo poistettu')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
      setMessage(`Poisto onnistui`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>

      <Notification message={message} />

      <h1>Phonebook</h1>

      <h2>Filter the phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>Add a new number</h2>
      <PersonForm addNumber={addNumber}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleClick={removePerson} />
    </div>
  )

}

export default App