const PersonForm = ({
  newName,
  newPhone,
  setNewName,
  setNewPhone,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{" "}
        <input
          value={newName}
          onChange={(evt) => setNewName(evt.target.value)}
        />
      </div>
      <div>
        phone:{" "}
        <input
          value={newPhone}
          onChange={(evt) => setNewPhone(evt.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
