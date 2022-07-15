import React, { useState } from 'react';
import styled from 'styled-components';

function SearchBar({ suggestion, link, onQuery }) {
  const [completedWord, setCompletedWord] = useState('');
  const [suggestionIndex, setSuggestionIndex] = useState(-1);

  function open(query) {
    window.open(link(query), '_blank');
  }

  function handleKeyDown(event) {
    if (suggestion.length === 0 || event.isComposing || event.keyCode === 229) {
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
    <StyledDiv>
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
            <li
              key={item}
              className={
                suggestionIndex === suggestion.indexOf(item) ? 'focus' : ''
              }
            >
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
    </StyledDiv>
  );
}

export default SearchBar;

const StyledDiv = styled.div`
  margin: 2rem auto;
  width: 80%;

  input {
    padding: 1rem 0.5rem;
    width: 80%;
    font-size: inherit;
    border: 1px solid lightgray;
  }

  ul {
    margin: 0;
    padding: 0;
    width: 80%;
    border: 1px solid lightgray;
  }

  li {
    padding: 0.5rem;
    width: 100;
    list-style: none;

    &:hover {
      background-color: lightgray;
    }

    &.focus {
      background-color: lightgray;
    }
  }

  a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }
`;
