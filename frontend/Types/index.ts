type User = {
  id: string,
  firstName: string,
  lastName: string
}
export type RolesDoc = {
  
}

export type Permissions = {

}

export type Permission = {
  id: string,
  name: string
}

export type Role = {
  id: string,
  name: string,
  permissions: [Permission]
}

type Users = {
  user: User,
  roles: [Role]
}

export interface UserDocument {
  user: User
}

export interface RolesDocument {
  id: string,
  name: string,
  roles: [Role]
}

export interface AllUsers {
  users: [Users]
}