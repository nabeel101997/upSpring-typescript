type User = {
  id: string,
  firstName: string,
  lastName: string
}

export interface UserDocument {
  user: User
}