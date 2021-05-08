import React, { useState } from "react";
import ReactDOM from "react-dom";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456" },
    { name: "Ada Lovelace", phone: "39-44-5323523" },
    { name: "Dan Abramov", phone: "12-43-234345" },
    { name: "Mary Poppendieck", phone: "39-23-6423122" },
  ]);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newSearch, setNewSearch] = useState("");

  const verifyName = (name, phone) => {
    const person = persons.find(
      (person) => person.name === name || person.phone === phone
    );
    if (person)
      alert(
        `the contact ${name} with phone ${phone} is already added to phonebook`
      );
    return person;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const existName = verifyName(newName, newPhone);

    if (newName && newPhone && !existName) {
      setPersons([
        ...persons,
        {
          name: newName,
          phone: newPhone,
        },
      ]);
    }

    setNewName("");
    setNewPhone("");
  };

  const showPersons = newSearch
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(newSearch.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newSearch={newSearch} setNewSearch={setNewSearch} />

      <h2>add a new</h2>

      <PersonForm
        handleSubmit={handleSubmit}
        setNewName={setNewName}
        setNewPhone={setNewPhone}
        newName={newName}
        newPhone={newPhone}
      />

      <h2>Numbers</h2>

      <Persons persons={showPersons} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
