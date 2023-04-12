import { createContext, useContext, useEffect, useState } from 'react';
import { onUserStateChange } from '../api/firebase';
import { login, logout } from '../api/firebase';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(getUserFromLocalStorage);

  useEffect(() => onUserStateChange(setUser), []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, uid: user && user.uid, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);

function getUserFromLocalStorage() {
  return JSON.parse(localStorage.getItem('user')) || {};
}
