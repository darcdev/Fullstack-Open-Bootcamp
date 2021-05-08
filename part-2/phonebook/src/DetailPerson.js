const DetailPerson = ({ person }) => {
  return (
    <li key={person.name}>
      {person.name} - {person.phone}
    </li>
  );
};

export default DetailPerson;
