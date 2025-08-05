import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  initials: string;
  jobTitle: string;
  profilePicture: string | null;
}

interface UserContextType {
  user: User;
  updateUser: (name: string, jobTitle: string, profilePicture?: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({
    name: 'super chair',
    initials: 'SC',
    jobTitle: 'Free',
    profilePicture: null,
  });

  const updateUser = (name: string, jobTitle: string, profilePicture?: string) => {
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
    setUser({ name, initials, jobTitle, profilePicture: profilePicture || user.profilePicture });
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};