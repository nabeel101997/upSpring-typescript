import React from 'react';
import Dashboard from '../components/pages/Dashboard';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../contexts/user-context';

function Home() {
  const { user } = useUser()
  return (
    <>
      {user ? <Dashboard user={user} /> : <h1>Loading...</h1>}
    </>
  )
}

export default Home;