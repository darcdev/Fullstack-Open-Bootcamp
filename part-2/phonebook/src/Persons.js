import DetailPerson from "./DetailPerson";

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => (
        <DetailPerson person={person} />
      ))}
    </ul>
  );
};

export default Persons;
