import DetailPerson from "./DetailPerson";

const Persons = ({ persons, handleDeletePerson }) => {
  return (
    <ul>
      {persons.map((person) => (
        <DetailPerson
          key={person.name}
          person={person}
          handleDeletePerson={handleDeletePerson}
        />
      ))}
    </ul>
  );
};

export default Persons;
