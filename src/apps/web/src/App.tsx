import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { IUserContext } from '@zelen.uk/types';

function App() {
  const navigate = useNavigate();
  const [session, setSession] = useState<IUserContext>();
  useEffect(() => {
    try {
      const sessionData = localStorage.getItem('session')
      if (!sessionData) {
        navigate('/login');
        return;
      }
      setSession(JSON.parse(sessionData));
    } catch (e) {
      navigate('/login');
    }
  }, [navigate]);
  const logout = () => localStorage.removeItem('session');
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome {session?.user.fullName},
          to logout click&nbsp;
          <Link className="App-link" onClick={logout} to="/login">here</Link>
        </p>
      </header>
    </div>
  );
}

export default App;
