const Persons = ({nameList}) => {
    return (
        <>
            {nameList.map((person) => <div key={person.id}>{person.name} {person.number}</div>)}
        </>
    )
}

export default Persons