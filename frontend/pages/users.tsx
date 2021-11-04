import React, { useState } from 'react';
import UsersPage from '../components/pages/Users';
import { useUser, useRole } from '../contexts/user-context';
import { useQuery } from 'react-query';
import { getUsers } from '../queries';
import { Permission, Role, RolesDoc, Permissions } from '../Types';

function Users(props: any) {

  const { user } = useUser()
  const { role } = useRole()
  let roles: any = [];
  let permissions: any = [];

  role?.roles?.map((role: any) => {
    roles.push(role?.name);
  })

  role?.roles?.map((role: Role) => {
    role?.permissions.map((permission: Permission) => permissions.push(permission.name));
  })

  const { data } = useQuery('Users', getUsers)
  console.log("Users", data)
  return (
    <>
      {user ? < UsersPage users={data} role={roles} permissions={permissions} user={user} /> : <h1>Loding...</h1>}
    </>
  )
}

export default Users;
