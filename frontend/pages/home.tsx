import React from 'react';
import { useQuery } from 'react-query';
import { getProfile } from '../queries';
import Dashboard from '../components/pages/Dashboard';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const { data } = useQuery('profile', getProfile)

  return (
    <Dashboard records={data?.data} />
  )
}

export default Home;