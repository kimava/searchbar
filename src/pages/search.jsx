import React, { useCallback, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import SearchBar from '../components/searchBar/searchBar';

function Search({ presenter }) {
  const [suggestion, setSuggestion] = useState([]);
  const [query, setQuery] = useState('');

  function handleSearch(query) {
    query ? setSuggestion(presenter.suggestQuery(query)) : setSuggestion([]);
  }

  const debouncedHandleSearch = useMemo(
    () => debounce(handleSearch, 300),
    [handleSearch]
  );

  const handleChange = useCallback(
    (value) => {
      setQuery(value);
      debouncedHandleSearch(value);
    },
    [debouncedHandleSearch]
  );

  const handleKeyDown = (key, index, list, callback, onSelect) => {
    presenter.navigateSuggestion(key, index, list, callback, onSelect);
  };

  function link(query) {
    return `https://www.google.com/search?q=${query}`;
  }

  return (
    <div>
      <SearchBar
        suggestion={suggestion}
        query={query}
        setQuery={setQuery}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        link={link}
      />
    </div>
  );
}

export default Search;
