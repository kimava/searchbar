import React, { useState } from 'react';

function SearchBar({ setQuery, suggestion, link }) {
  const [completedWord, setCompletedWord] = useState('');

  function onSubmit(event) {
    if (event.key === 'Enter' && completedWord.length > 0) {
      window.open(link(completedWord), '_blank');
    }
  }

  return (
    <div>
      <input
        placeholder='검색어를 입력하세요'
        value={completedWord}
        onChange={(e) => {
          setCompletedWord(e.currentTarget.value);
          setQuery(e.currentTarget.value);
        }}
        onKeyPress={onSubmit}
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
