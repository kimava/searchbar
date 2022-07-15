import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../searchBar';

describe('SearchBar', () => {
  const suggestion = ['마스크', '링겔대'];
  let query;
  let setQuery;
  let onSearch;
  let link;
  let SearchBarComponent;

  beforeEach(() => {
    setQuery = jest.fn();
    onSearch = jest.fn();
    link = jest.fn();
    SearchBarComponent = (
      <SearchBar
        suggestion={suggestion}
        query={query}
        setQuery={setQuery}
        onSearch={onSearch}
        link={link}
      />
    );
  });

  afterEach(() => {
    query = '';
  });

  describe('Input', () => {
    beforeEach(() => {
      render(SearchBarComponent);
    });

    it('calls onSearch when input value is changed', () => {
      const input = screen.getByPlaceholderText('검색어를 입력하세요');

      userEvent.type(input, '마');

      expect(onSearch).toHaveBeenCalledWith('마');
    });

    it('clears query when clicking x button', () => {
      const button = screen.getByText('X');
      const input = screen.getByPlaceholderText('검색어를 입력하세요');
      userEvent.click(button);

      expect(input).toHaveValue('');
    });
  });
});