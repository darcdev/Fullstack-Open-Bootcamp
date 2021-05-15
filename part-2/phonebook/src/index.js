import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons));
  }, []);

  const verifyName = (name, phone) => {
    const person = persons.find((person) => person.name === name);
    return person;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const existName = verifyName(newName, newPhone);

    if (existName) {
      const confirm = window.confirm(
        `${newName} is already added to phonebook , replace the old number with a new one?`
      );
      if (confirm) {
        handleUpdatePerson();
        return;
      }
    }
    if (newName && newPhone && !existName) {
      const newPerson = {
        name: newName,
        number: newPhone,
      };
      personService
        .create(newPerson)
        .then((newPerson) => setPersons([...persons, newPerson]));
    }

    setNewName("");
    setNewPhone("");
  };

  const showPersons = newSearch
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(newSearch.toLowerCase())
      )
    : persons;

  const handleDeletePerson = (id, name) => {
    const confirm = window.confirm(`Delete ${name}?`);
    if (confirm) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const handleUpdatePerson = () => {
    const { id } = persons.find((person) => person.name === newName);
    const updatePerson = {
      name: newName,
      number: newPhone,
    };
    personService
      .update(id, updatePerson)
      .then((personUpdate) =>
        setPersons(
          persons.map((person) => (person.id !== id ? person : personUpdate))
        )
      );
  };

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

      <Persons
        persons={showPersons}
        handleSubmit={handleSubmit}
        handleDeletePerson={handleDeletePerson}
        handleUpdatePerson={handleUpdatePerson}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
