import SearchPresenter from '../searchPresenter';
import stubData from './stubData';

describe('Search', () => {
  let search;

  beforeEach(() => {
    search = new SearchPresenter(stubData, 3);
  });

  it('is initialized with the number of max result to show', () => {
    expect(search.maxResult).toBe(3);
  });

  describe('suggestQuery', () => {
    it('returns an empty array if there is no match', () => {
      const items = search.suggestQuery('a');
      expect(items).toEqual([]);
    });

    it('returns a filtered array of product names that include query', () => {
      const items = search.suggestQuery('링');
      expect(items).toEqual(['링겔대', '링겔대 (3m)']);
    });

    it('returns length of array that doesnt exceed max result number', () => {
      const items = search.suggestQuery('마스크');
      expect(items).toEqual(['마스크1', '마스크2', '마스크3']);
    });

    it('compares data name with queries as lower cases', () => {
      const items = search.suggestQuery('s');
      expect(items).toEqual(['Stub']);
    });
  });

  describe('navigateSuggestion', () => {
    let key;
    let index;
    let list;
    let callback;
    let onSelect;

    beforeEach(() => {
      index = -1;
      list = ['마스크', '링겔대'];
      callback = jest.fn();
      onSelect = jest.fn();
      search = new SearchPresenter(stubData, 3);
    });

    it('increases index when pressing arrow down key within suggestion list', () => {
      search.navigateSuggestion('ArrowDown', index, list, callback, onSelect);
      expect(callback).toHaveBeenCalledWith(0);
    });

    it('does not increase index if it is bigger than list length - 1', () => {
      search.navigateSuggestion('ArrowDown', 3, list, callback, onSelect);
      expect(callback).toHaveBeenCalledTimes(0);
    });

    it('decreases index when pressing arrow up key within suggestion list', () => {
      search.navigateSuggestion('ArrowUp', 1, list, callback, onSelect);
      expect(callback).toHaveBeenCalledWith(0);
    });

    it('does not decrease index if it is less than 0', () => {
      search.navigateSuggestion('ArrowUp', -1, list, callback, onSelect);
      expect(callback).toHaveBeenCalledTimes(0);
    });

    it('calls onSelect function and sets index default -1 when pressing enter key', () => {
      search.navigateSuggestion('Enter', 1, list, callback, onSelect);
      expect(onSelect).toHaveBeenCalledWith(1);
      expect(callback).toBeCalledWith(-1);
    });
  });
});
