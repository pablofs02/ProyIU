import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { useFilterContext } from "../context/FilterContext";
import { ImCross } from "react-icons/im";

function SearchBar() {
  const { setSearch, setSearchBarInput } = useFilterContext();

  useEffect(() => {
    setSearchBarInput(document.querySelector("input"));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBarInput(e.target);
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="searchBar">
        <ImCross onClick={() => {setSearch("")}} />
        <Link to={"/store"} className="h-100">
          <input type="text" onChange={handleChange} />
        </Link>
        <Link to={"/store"}>
          <img src="/src/assets/search.svg" alt="search icon" />
        </Link>
      </div>
    </>
  );
}

export default SearchBar;

//The below example will make an async request for the data only after the user has stopped typing for 500ms. This is a very common use case for debouncing.
/*
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  useEffect(() => {
    // Make an async request for the data
  }, [debouncedSearchTerm]);

  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
    />
  );
}
*/
