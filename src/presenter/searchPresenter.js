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
}

export default SearchPresenter;
