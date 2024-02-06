import { FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';


const Search = ({ searchTerm, onSearchChange }) => {
  return (
  <div className="search-bar col-lg-7" style={{position:'absolute',top:'13%',left:'6%'}}>
  <FormControl className="form-control-lg" type="text" placeholder="Search" value={searchTerm}
        onChange={onSearchChange} />
  </div>
  );
};

Search.propTypes = {
  searchTerm: PropTypes.string.isRequired,  // 驗證 searchTerm 存在並為字串型態
  onSearchChange: PropTypes.func.isRequired,  // 驗證 onSearchChange 存在並為函數型態
};


export default Search;