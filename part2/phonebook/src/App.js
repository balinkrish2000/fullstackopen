import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

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

  const handleSubmit = (event) => {
    event.preventDefault()
    
    if (persons.map((person) => person.name).includes(newName)){
      alert(`${newName} is already added to phonebook`)
    } else {
      const newNameObject = {
        name: newName, 
        number: newNumber, 
        id: persons.length + 1
      }
      setPersons(persons.concat(newNameObject))
    }

    setNewName('')
    setNewNumber('')
  }

  useEffect(() => {
    axios.get('https://balinkrish2000-friendly-goldfish-g7jwqp45756cv6xp-3002.preview.app.github.dev/persons')
      .then(response => {
        setPersons(response.data)
      })
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
      <Persons nameList= {nameList}/>
    </div>
  )
}

export default App