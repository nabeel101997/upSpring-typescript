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

type RoleObject = {
  _id: string,
  name: string,
  createdAt: string,
  updatedAt: string
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

export interface AllRolesDocument {
  status: number,
  message: string,
  data: object,
  users: [RoleObject]
}

export interface Tags{
  
}
