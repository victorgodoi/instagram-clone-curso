import './App.css';
import { useEffect, useState } from 'react';
import { db, auth } from './firebase';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import Header from './components/Header';
import Hero from './components/Hero';
import { NotificationProvider } from './providers/NotificationProvider';

function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((item) => {
      setUser(item ? (item.displayName) : null);
    });

    return () => unsubscribeAuth();
  }, [user]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            info: doc.data(),
          }))
        );
      },
      (error) => {
        console.error('Firestore onSnapshot error (posts):', error);
      }
    );

    return () => unsubscribe();
  }, [user]);

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