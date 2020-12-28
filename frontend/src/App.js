import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import UserPage from './pages/User';
import Register from './components/Register';


function App() {

  const [token, setToken] = useState(null);

  const [message, setMessage] = useState([]);
  const clearMsg = () => {
    setMessage('');
  }
  const displayMsg = () => {
    if (typeof message === 'object') {
      for (let key in message) {
      <li>{key}</li>
      }
    } else {
      <li>{message}</li>
    }
    
  }

  const checkToken = () => {
    setToken(localStorage.getItem('token'));
  }

  useEffect(() => {
    checkToken();
    console.log(typeof message);
  }, [token, message]);

  return (
    <BrowserRouter>
      <nav>
        {token ? 
          <Logout setToken={setToken} setMessage={setMessage}/> :
          <>
          <Login setToken={setToken} setMessage={setMessage}/>
          <Register setMessage={setMessage}/>
          </>
        }
      </nav>

      {message.length > 0 ?
        <ul>{displayMsg}<span onClick={clearMsg}>&times;</span></ul>
        
        :
        ''
      }
      <Switch>
        <Route path="/:user" render={routerProps => <UserPage username={routerProps} />} />
      </Switch>

    </BrowserRouter>
  );
}

export default App;
