import React from 'react';
import EditUser from '../../components/forms/EditForm';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../../contexts/user-context';

function Edit() {
  const { user } = useUser()
  return (
    <>
      {user ? <EditUser /> : <h1>Loading...</h1>}
    </>
  )
}

export default Edit;