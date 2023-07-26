import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  let nameList = [...persons];

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
  }

  const handleDelete = (event) => {
    let personId = event.target.value

    if (window.confirm(`Delete ${persons.find((person) => person.id === parseInt(personId)).name} ?`)) {
      personService.remove(personId)
      .then(() => {
          setPersons(persons.filter((person) => person.id !== parseInt(personId)? person : null))
        })
      .catch(() => {
        alert('Record not present')
        setPersons(persons.filter((person) => person.id !== parseInt(personId)? person : null))
      })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    
    if (persons.map((person) => person.name).includes(newName)){
      alert(`${newName} is already added to phonebook`)
    } 
    else 
    {
      const newNameObject = {
        name: newName, 
        number: newNumber
      }
      personService.create(newNameObject)
        .then(returnedNameObject => setPersons(persons.concat(returnedNameObject)))
    }
    setNewName('')
    setNewNumber('')
  }

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => setPersons(initialPersons))
  },[])

  if (filterName.length > 0) {
    nameList = persons.filter(
      (person) => person.name.toLowerCase().search(filterName.toLowerCase()) !== -1 ? person:null
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter name={filterName} handleChange={handleFilterNameChange}/>
      <h2>add a new</h2>
      <PersonForm 
          name={newName} 
          number={newNumber} 
          onNameChange={handleNameChange}
          onNumberChange = {handleNumberChange}
          onSubmit={handleSubmit}
          />
      <h2>Numbers</h2>
      <Persons nameList= {nameList} deletePerson={handleDelete}/>
    </div>
  )
}

export default App