import './App.css';
import { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import Header from './components/Header';
import Hero from './components/Hero';

function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  console.log(posts);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({
        id: doc.id,
        info: doc.data(),
      })));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <Header user={user} setUser={setUser} />
      <Hero posts={posts} />
    </div>
  );
}

export default App;