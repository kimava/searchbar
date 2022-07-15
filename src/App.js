import { useState, useEffect } from 'react';
import Search from './pages/search.jsx';

function App({ client }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    client
      .fetchItems()
      .then((items) => setData(items))
      .catch(console.log);
  }, [client]);

  return (
    <div>
      <Search />
    </div>
  );
}

export default App;
