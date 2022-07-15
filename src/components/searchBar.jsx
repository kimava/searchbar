import React, { useState } from 'react';

function SearchBar({ suggestion, link, onQuery }) {
  const [completedWord, setCompletedWord] = useState('');
  const [suggestionIndex, setSuggestionIndex] = useState(-1);

  function open(query) {
    window.open(link(query), '_blank');
  }

  function handleKeyDown(event) {
    if (suggestion.length === 0) {
      return;
    }

    if (event.key === 'ArrowDown' && suggestion.length - 1 > suggestionIndex) {
      setSuggestionIndex((suggestionIndex) => suggestionIndex + 1);
    } else if (event.key === 'ArrowUp' && suggestionIndex >= 0) {
      setSuggestionIndex((suggestionIndex) => suggestionIndex - 1);
    } else if (event.key === 'Enter' && suggestionIndex >= 0) {
      open(suggestion[suggestionIndex]);
      setCompletedWord(suggestion[suggestionIndex]);
      setSuggestionIndex(-1);
    } else if (
      event.key === 'Enter' &&
      completedWord.length > 0 &&
      suggestionIndex === -1
    ) {
      open(completedWord);
    }
  }

  return (
    <div>
      <input
        placeholder='검색어를 입력하세요'
        value={completedWord || ''}
        onChange={(e) => {
          setCompletedWord(e.currentTarget.value);
          onQuery(e.currentTarget.value);
        }}
        onKeyDown={handleKeyDown}
      />
      {suggestion && (
        <ul>
          {suggestion.map((item) => (
            <li key={item}>
              <a
                target='_blank'
                onClick={() => {
                  setCompletedWord(item);
                }}
                href={link(item)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
