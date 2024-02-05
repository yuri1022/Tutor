import { FormControl } from 'react-bootstrap';

const Search = () => {
  return (
  <div className="search-bar col-lg-7" style={{position:'absolute',top:'13%',left:'6%'}}>
  <FormControl className="form-control-lg" type="text" placeholder="Search"  />
  </div>
  );
};

export default Search;