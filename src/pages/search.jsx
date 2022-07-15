import React, { useState, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';
import SearchBar from '../components/searchBar';

function Search({ presenter }) {
  const [suggestion, setSuggestion] = useState([]);

  function handleQuery(query) {
    query ? setSuggestion(presenter.suggestQuery(query)) : setSuggestion([]);
  }

  const debouncedhanldeQuery = debounce(handleQuery, 200);

  function link(query) {
    return `https://www.google.com/search?q=${query}`;
  }

  return (
    <div>
      <SearchBar
        suggestion={suggestion}
        link={link}
        onQuery={debouncedhanldeQuery}
      />
    </div>
  );
}

export default Search;
