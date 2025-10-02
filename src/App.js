import './App.css';
import { useState } from 'react';
import Header from './components/Header';

function App() {

  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <Header user={user} setUser={setUser} />
    </div>
  );
}

export default App;