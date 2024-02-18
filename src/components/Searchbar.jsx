import { FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';


const Search = ({ searchTerm, onSearchChange }) => {
  return (
  <div className="search-bar col-lg-2" style={{position:'absolute',right:'10%'}}>
  <FormControl className="form-control-lg" type="text" placeholder="Search" value={searchTerm}
         onChange={(e) => {
          onSearchChange(e.target.value);
          console.log('Search Term:', e.target.value);}} />
  </div>
  );
};

Search.propTypes = {
  searchTerm: PropTypes.string.isRequired,  // 驗證 searchTerm 存在並為字串型態
  onSearchChange: PropTypes.func.isRequired,  // 驗證 onSearchChange 存在並為函數型態
};


export default Search;