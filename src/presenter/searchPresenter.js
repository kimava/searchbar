class SearchPresenter {
  constructor(data, maxResult) {
    this.data = data;
    this.maxResult = maxResult;
  }

  suggestQuery(query) {
    const result = this.data.reduce(
      (acc, cur) => (
        cur.name.toLowerCase().includes(query.toLowerCase()) &&
          acc.push(cur.name),
        acc
      ),
      []
    );

    return result.length > this.maxResult
      ? result.slice(0, this.maxResult)
      : result;
  }

  navigateSuggestion(key, index, list, callback, onSelect) {
    if (key === 'ArrowDown' && list.length - 1 > index) {
      callback((index) => index + 1);
    } else if (key === 'ArrowUp' && index >= 0) {
      callback((index) => index - 1);
    } else if (key === 'Enter') {
      onSelect(index);
      callback(-1);
    }
  }
}

export default SearchPresenter;
