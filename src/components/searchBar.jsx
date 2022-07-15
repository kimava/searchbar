import React, { useState } from 'react';
import styled from 'styled-components';

function SearchBar({ suggestion, query, setQuery, onSearch, link }) {
  const [listIndex, setListIndex] = useState(-1);

  function openLink(query) {
    window.open(link(query), '_blank');
    clearQuery();
  }

  function clearQuery() {
    setQuery('');
  }

  function handleKeyDown({ key, keyCode, isComposing }) {
    // return if no suggestion and prevent keydown occurs twice when pressed once
    if (suggestion.length === 0 || isComposing || keyCode === 229) {
      return;
    }

    const arrowDown = suggestion.length - 1 > listIndex;
    const arrowUp = listIndex >= 0;

    if (key === 'ArrowDown' && arrowDown) {
      setListIndex((listIndex) => listIndex + 1);
    } else if (key === 'ArrowUp' && arrowUp) {
      setListIndex((listIndex) => listIndex - 1);
    } else if (key === 'Enter' && listIndex >= 0) {
      setQuery(suggestion[listIndex]);
      openLink(suggestion[listIndex]);
      setListIndex(-1);
    } else if (key === 'Enter' && listIndex === -1 && query.length > 0) {
      openLink(query);
    }
  }

  return (
    <StyledDiv>
      <StyledForm>
        <input
          placeholder='검색어를 입력하세요'
          value={query || ''}
          onChange={({ target: { value } }) => {
            setQuery(value);
            onSearch(value);
          }}
          onKeyDown={handleKeyDown}
        />
        <button onClick={() => setQuery('')}>X</button>
      </StyledForm>

      {query && suggestion && (
        <StyledUl>
          {suggestion.map((item) => (
            <StyledLi
              key={item}
              className={listIndex === suggestion.indexOf(item) ? 'focus' : ''}
            >
              <a
                target='_blank'
                onClick={() => {
                  setQuery(item);
                  clearQuery();
                }}
                href={link(item)}
              >
                {item}
              </a>
            </StyledLi>
          ))}
        </StyledUl>
      )}
    </StyledDiv>
  );
}

export default SearchBar;

const StyledDiv = styled.div`
  margin: 2rem auto;
  width: 80%;
`;

const StyledForm = styled.div`
  position: relative;
  width: 80%;

  input {
    padding: 1rem 0.5rem;
    width: 100%;
    font-size: inherit;
    border: 1px solid lightgray;
  }

  button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    border: none;
    background: none;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

const StyledUl = styled.ul`
  margin: 0;
  padding: 0;
  width: 80%;
  border: 1px solid lightgray;
`;

const StyledLi = styled.li`
  padding: 0.5rem;
  width: 100;
  list-style: none;

  &:hover {
    background-color: lightgray;
  }

  &.focus {
    background-color: lightgray;
  }

  a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }
`;
