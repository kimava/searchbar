import React, { useState, useEffect } from 'react';
import SearchBar from '../components/searchBar';

function Search({ presenter }) {
  const [query, setQuery] = useState('');
  const [suggestion, setSuggestion] = useState([]);

  useEffect(() => {
    query && setSuggestion(presenter.suggestQuery(query));
  }, [presenter, query]);

  function link(query) {
    return `https://www.google.com/search?q=${query}`;
  }

  return (
    <div>
      <SearchBar setQuery={setQuery} suggestion={suggestion} link={link} />
    </div>
  );
}

export default Search;
