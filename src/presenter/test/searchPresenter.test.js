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
  });
});
