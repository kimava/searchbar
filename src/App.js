import { useState, useEffect } from 'react';
import SearchPresenter from './presenter/searchPresenter.js';
import Search from './pages/search.jsx';

function App({ client }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    client
      .fetchItems()
      .then((items) => setData(items))
      .catch(console.log);
  }, [client]);

  const presenter = new SearchPresenter(data, 10);

  return (
    <div>
      <Search presenter={presenter} />
    </div>
  );
}

export default App;
