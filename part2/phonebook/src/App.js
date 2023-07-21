import { useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

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

  let nameList = [];
  if (filterName.length > 0) {
    nameList = persons.filter(
      (person) => person.name.toLowerCase().search(filterName.toLowerCase()) !== -1 ? person:null
    )
  } else {
    nameList = [...persons]
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
      <Persons nameList={nameList}/>
    </div>
  )
}

export default App