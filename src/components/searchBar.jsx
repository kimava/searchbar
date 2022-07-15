import React from 'react';

function SearchBar({ setQuery, suggestion }) {
  return (
    <div>
      <input
        placeholder='검색어를 입력하세요'
        onChange={(e) => {
          setQuery(e.currentTarget.value);
        }}
      />
      {suggestion && (
        <ul>
          {suggestion.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
