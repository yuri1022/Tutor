import { FormControl } from 'react-bootstrap';

const Search = () => {
  return (
  <div className="search-bar" style={{position:'absolute',top:'10%',left:'5%'}}>
  <FormControl className="form-control-lg" type="text" placeholder="Search" />
  </div>
  );
};

export default Search;