const Persons = ({nameList, deletePerson}) => {
    return (
        <>
            {nameList.map((person) => {
                return (
                    <div key={person.id}>
                        {person.name} {person.number}
                        <button onClick={deletePerson} value={person.id}>delete</button>
                    </div>
                )
        })}
        </>
    )
}

export default Persons