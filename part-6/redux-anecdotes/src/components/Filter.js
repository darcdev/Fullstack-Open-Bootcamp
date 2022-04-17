import { connect } from 'react-redux';
import { changeFilter } from '../reducers/filterReducer';

const Filter = ({ changeFilter }) => {
  const handleChange = (event) => {
    const value = event.target.value;
    changeFilter(value);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = {
  changeFilter,
};
const FilterConnected = connect(null, mapDispatchToProps)(Filter);
export default FilterConnected;
