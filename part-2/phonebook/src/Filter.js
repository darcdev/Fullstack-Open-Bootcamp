const Filter = ({ newSearch, setNewSearch }) => {
  return (
    <div>
      filter shown with{" "}
      <input
        value={newSearch}
        onChange={(evt) => setNewSearch(evt.target.value)}
      />
    </div>
  );
};

export default Filter;
