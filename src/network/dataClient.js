export default class DataClient {
  async fetchItems() {
    const res = await fetch('/data.json');
    let data;
    try {
      data = await res.json();
    } catch (error) {
      console.log(error);
    }
    return data;
  }
}
