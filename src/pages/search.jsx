import React, { useState } from 'react';
import debounce from 'lodash.debounce';
import SearchBar from '../components/searchBar';

function Search({ presenter }) {
  const [suggestion, setSuggestion] = useState([]);
  const [query, setQuery] = useState('');

  function handleSearch(query) {
    query ? setSuggestion(presenter.suggestQuery(query)) : setSuggestion([]);
  }

  const debouncedhanldeSearch = debounce(handleSearch, 200);

  function link(query) {
    return `https://www.google.com/search?q=${query}`;
  }

  return (
    <div>
      <SearchBar
        suggestion={suggestion}
        query={query}
        setQuery={setQuery}
        onSearch={debouncedhanldeSearch}
        link={link}
      />
    </div>
  );
}

export default Search;
