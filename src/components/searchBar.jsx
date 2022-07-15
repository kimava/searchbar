import React from 'react';

function SearchBar({ setQuery, suggestion, link }) {
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
            <li key={item}>
              <a target='_blank' href={link(item)}>
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
