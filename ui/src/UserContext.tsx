// UserContext.tsx
// import React, { createContext, useState, ReactNode, useEffect } from 'react';
// import http from './http';

// interface User {
//   permissions: string[];
// }

// interface UserContextType {
//   user: User;
//   setUser: React.Dispatch<React.SetStateAction<User>>;
//   isOnline : boolean;
//   setIsOnline : React.Dispatch<React.SetStateAction<boolean>>
// }

// export const UserContext = createContext<UserContextType | undefined>(undefined);

// export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User>({
//     permissions: [],
//   });
//   const [isOnline, setIsOnline] = useState<boolean>(true)
//   const obj = {name : "jeet"}

//   const fetchUserPermissions = async () => {
//     try {
//       console.log('rendering userContex');
      
//       const response = await http.post('/permission/user-permissions');
//       const data = response.data;
//       if (data.status) {
//         setUser({ permissions: data.response });
//       } else {
//         console.error('Error fetching user permissions');
//       }
//     } catch (error) {
//       console.error('Error fetching user permissions:', error);
//     }
//   };


//   useEffect(() => {
//     if (localStorage.getItem('token')) {
//       fetchUserPermissions();
//     }
//    const userOnline = window.addEventListener('online', () => {
//     console.log('Became online')
//     setIsOnline(true)
//   });
//   const userOffline = window.addEventListener('offline', () => {
//     console.log('Became offline')
//     setIsOnline(false)
//   });

  
//   }, []);
//   console.log('rendering context')

//   return (
//     <UserContext.Provider value={{ user, setUser, isOnline, obj }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
import React, { createContext, useState, ReactNode } from 'react';

interface User {
  permissions: string[]; // Update this according to your user data structure
}

interface UserContextProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}
const storedPermissions = localStorage.getItem('permissions');

const initialUser: User = {
  permissions: storedPermissions ? JSON.parse(storedPermissions) : [],
  // permissions: JSON.parse(localStorage.getItem('permissions') || []) || [],
};

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  console.log('rendering user context');

  const [user, setUser] = useState<User>(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
