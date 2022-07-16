import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../searchBar';

describe('SearchBar', () => {
  let suggestion;
  let query;
  let setQuery;
  let onChange;
  let onKeyDown;
  let link;
  let handleSelect;

  beforeEach(() => {
    setQuery = jest.fn();
    onChange = jest.fn();
    onKeyDown = jest.fn();
    link = jest.fn();
    handleSelect = jest.fn();
  });

  it('renders', () => {
    const component = render(
      <SearchBar
        suggestion={['마스크']}
        query={'마'}
        setQuery={setQuery}
        onChange={onChange}
        onKeyDown={onKeyDown}
        link={link}
      />
    );
    expect(component.container).toMatchSnapshot();
  });

  describe('Input', () => {
    beforeEach(() => {
      render(
        <SearchBar
          suggestion={['마스크', '마스크2']}
          query={query}
          setQuery={setQuery}
          onChange={onChange}
          onKeyDown={onKeyDown}
          link={link}
        />
      );
    });

    it('calls onChange when input value is changed', () => {
      const input = screen.getByPlaceholderText('검색어를 입력하세요');

      userEvent.type(input, '마');

      expect(onChange).toHaveBeenCalledWith('마');
    });

    it('clears query when clicking x button', () => {
      const button = screen.getByText('X');
      const input = screen.getByPlaceholderText('검색어를 입력하세요');
      userEvent.click(button);

      expect(input).toHaveValue('');
    });
  });

  describe('SuggestionBox', () => {
    beforeEach(() => {
      render(
        <SearchBar
          suggestion={['마스크']}
          query={'마'}
          setQuery={setQuery}
          onChange={onChange}
          onKeyDown={onKeyDown}
          link={link}
        />
      );
    });

    it('changes query to suggested word when clicked', () => {
      const suggested = screen.getByText('마스크');
      userEvent.click(suggested);

      expect(setQuery).toHaveBeenCalledWith('마스크');
    });
  });
});
