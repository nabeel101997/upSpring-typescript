import { createContext, FC, useContext, useState } from "react";

import { UserDocument } from "../Types";

export interface UserContext {
  user?: UserDocument
  role?: any
  setUser: (user?: UserDocument) => void
  setRole: (role?: any) => void
}

export const UserContextImpl = createContext<UserContext>(null!)

export function useUser() {
  return useContext(UserContextImpl)
}

export function useRole() {
  return useContext(UserContextImpl)
}

interface Props {
  initialUser?: UserDocument
  initialRole?: any
}

export const UserProvider: FC<Props> = ({ children, initialUser, initialRole }) => {
  const [user, setUser] = useState(initialUser)
  const [role, setRole] = useState(initialRole)
  // console.log("Roles from context", role?.roles[0]?.name)

  return <UserContextImpl.Provider value={{ user, setUser, role, setRole }}>{children}</UserContextImpl.Provider>
}