import { useState, useEffect } from 'react';

function App({ client }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    client
      .fetchItems()
      .then((items) => setData(items))
      .catch(console.log);
  }, [client]);

  return <div></div>;
}

export default App;
