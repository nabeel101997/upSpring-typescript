import React from 'react';
import UsersPage from '../components/pages/Users';
import { useUser, useRole } from '../contexts/user-context';
import { useQuery } from 'react-query';
import { getUsers } from '../queries';

function Users(props: any) {

  const { user } = useUser()
  const { role } = useRole()
  const name = role?.roles[0]?.name;
  console.log("name", name)
  const { data } = useQuery('Users', getUsers)
  return (
    <>
      {user && name === "Admin" ? < UsersPage users={data} /> : <h1>Unauthorized</h1>}
    </>
  )
}

export default Users;
