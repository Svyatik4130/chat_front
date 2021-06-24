import './App.css';
import React, { useContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import AppRouter from "./components/AppRouter";
import { useAuthState } from 'react-firebase-hooks/auth'
import { Context } from '.';
import Loader from './components/Loader';

function App() {
  const { auth } = useContext(Context)
  //wtffff removing the user leads to crash
  const [user, loading] = useAuthState(auth)

  if(loading) {
    return <Loader/>
  }

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
