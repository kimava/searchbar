import React, { useState, useEffect } from 'react';
import SearchBar from '../components/searchBar';

function Search({ presenter }) {
  const [query, setQuery] = useState('');
  const [suggestion, setSuggestion] = useState([]);

  useEffect(() => {
    query && setSuggestion(presenter.suggestQuery(query));
  }, [presenter, query]);

  return (
    <div>
      <SearchBar setQuery={setQuery} suggestion={suggestion} />
    </div>
  );
}

export default Search;
