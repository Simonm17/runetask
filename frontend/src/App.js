import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';


function App() {

  const [token, setToken] = useState(null);
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');

  const checkToken = () => {
    setToken(localStorage.getItem('token'));
  }

  const checkUser = () => {
    setUser(localStorage.getItem('user'));
  }

  useEffect(() => {
    checkToken();
    checkUser();
    console.log(`Component refreshed after token add/delete.`)
  }, [token, user]);

  return (
    <div className="App">
      {message &&
        <h5>{message}</h5>
      }
      {token ? 
        <Logout setToken={setToken} setUser={setUser} setMessage={setMessage}/> :
        <Login setToken={setToken} setUser={setUser} setMessage={setMessage}/>
      }
    </div>
  );
}

export default App;
