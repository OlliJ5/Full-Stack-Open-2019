import React from 'react'

const Persons = ({ filteredPersons, handleClick }) => {
    return (
        <div>
            {filteredPersons.map(person =>
                <p key={person.id}>
                    {person.name}  {person.number}
                    <button onClick={() => handleClick(person.id)}>delete</button>
                </p>)}
        </div>
    )
}

export default Persons