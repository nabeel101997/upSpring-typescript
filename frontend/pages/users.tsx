import React from 'react';
import UsersPage from '../components/pages/Users';
import { useUser, useRole } from '../contexts/user-context';
import { useQuery } from 'react-query';
import { getUsers } from '../queries';

function Users(props: any) {

  const { user } = useUser()
  const { role } = useRole()
  let name: any = [];
  role?.roles?.map((role: any) => {
    name.push(role?.name);
  })
  const { data } = useQuery('Users', getUsers)
  return (
    <>
      {user ? < UsersPage users={data} role={name} user={user} /> : <h1>Loding...</h1>}
    </>
  )
}

export default Users;
