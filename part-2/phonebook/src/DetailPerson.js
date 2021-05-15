import React from "react";

const DetailPerson = ({ person, handleDeletePerson }) => {
  return (
    <li>
      {person.name} - {person.number}{" "}
      <button onClick={() => handleDeletePerson(person.id, person.name)}>
        delete
      </button>
    </li>
  );
};

export default DetailPerson;
