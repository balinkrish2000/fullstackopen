import { useState } from 'react'

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
      <p>filter shown with 
        <input value={filterName}
        onChange={handleFilterNameChange}/>
      </p>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName}
          onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber}
          onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {nameList.map((person) => <div key={person.id}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App