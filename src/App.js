import './App.css';
import { useEffect, useState } from 'react';
import { db, auth } from './firebase';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import Header from './components/Header';
import Hero from './components/Hero';
// import Notification from './components/Notification';
import { NotificationProvider } from './providers/NotificationProvider';

function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {

    auth.onAuthStateChanged((item) => {
      setUser(item.displayName || null)
    })

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
    <NotificationProvider>
      <div className="App">
        <Header user={user} setUser={setUser} />
        <Hero posts={posts} user={user}/>
      </div>
    </NotificationProvider>
  );
}

export default App;