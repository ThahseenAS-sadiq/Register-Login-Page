import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from 'axios';
import { useState, useEffect } from 'react';


function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  console.log(user);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          const res = await axios.get('/api/users/me');   // FIXED ENDPOINT
          setUser(res.data);                              // req.user comes here

        } catch (err) {
          setError('Failed to fetch user data');
          localStorage.removeItem('token');
        }
      }
    };
    fetchUser();
  }, []);


  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} error={error} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;

