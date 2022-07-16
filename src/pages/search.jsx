import React, { useState, useEffect } from 'react';
import SearchBar from '../components/searchBar/searchBar';
import useDebounce from '../hooks/useDebounce';

function Search({ presenter }) {
  const [suggestion, setSuggestion] = useState([]);
  const [query, setQuery] = useState('');

  const debounced = useDebounce(query, 200);

  useEffect(() => {
    debounced
      ? setSuggestion(presenter.suggestQuery(debounced))
      : setSuggestion([]);
  }, [debounced]);

  const handleChange = (value) => {
    setQuery(value);
  };

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
