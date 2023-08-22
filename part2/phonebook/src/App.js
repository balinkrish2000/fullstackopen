import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [notifyMessage, setNotifyMessage] = useState({message: '', type: ''})

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
    let personName = persons.find((person) => person.id === personId).name

    if (window.confirm(`Delete ${personName} ?`)) {
      personService.remove(personId)
      .then(() => {
          setNotifyMessage({message: `Deleted ${personName}`, type: 'notify'})
          setTimeout(() => setNotifyMessage({message: '', type: ''}), 5000)
          setPersons(persons.filter((person) => person.id !== personId? person : null))
        })
      .catch(() => {
        setNotifyMessage({message: `Information of ${personName} has already been removed from server`, type: 'error'})
        setTimeout(() => setNotifyMessage({message: '', type: ''}), 5000)
        setPersons(persons.filter((person) => person.id !== parseInt(personId)? person : null))
      })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    
    if (persons.find((person) => person.name === newName)){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updateNameObject = {
          name: newName,
          number: newNumber
        }
        let personId = persons.find((person) => person.name === newName).id
        personService.update(personId, updateNameObject)
        .then(returnedNameObject => {
          setNotifyMessage({message: `Updated ${returnedNameObject.name}`, type: 'notify'})
          setTimeout(() => setNotifyMessage({message: '', type: ''}), 5000)
          setPersons(persons.map((person) => person.id !== returnedNameObject.id ? person : returnedNameObject))
        })
        .catch(error => {
          setNotifyMessage({message: error.response.data.error, type: 'error'})
          setTimeout(() => setNotifyMessage({message: '', type: ''}), 5000)
        })
      }
    } 
    else 
    {
      const newNameObject = {
        name: newName, 
        number: newNumber
      }
      personService.create(newNameObject)
        .then(returnedNameObject => {
          setNotifyMessage({message: `Added ${returnedNameObject.name}`, type: 'notify'})
          setTimeout(() => setNotifyMessage({message: '', type: ''}), 5000)
          setPersons(persons.concat(returnedNameObject))
        })
        .catch(error => {
          setNotifyMessage({message: error.response.data.error, type: 'error'})
          setTimeout(() => setNotifyMessage({message: '', type: ''}), 5000)
        })
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
      <Notification message={notifyMessage.message} type={notifyMessage.type}/>
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