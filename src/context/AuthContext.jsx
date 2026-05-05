import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const [loading, setLoading] = useState(true);

  const login = (userData, accessToken) => {
    setUser(userData);
    setToken(accessToken);
    localStorage.setItem('accessToken', accessToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('accessToken');
  };

  const fetchCurrentUser = async (authToken) => {
    try {
      const response = await fetch('https://api.freeapi.app/api/v1/users/current-user', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      const json = await response.json();
      if (json.success) {
        if (json.data.avatar.url === "https://via.placeholder.com/200x200.png") {
          setUser({
            ...json.data,
            avatar: {
              url: `https://api.dicebear.com/7.x/initials/svg?seed=${json.data.username}`
            }
          });
        } else setUser(json.data);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCurrentUser(token);
    } else {
      setLoading(false);
    }
  }, [token]);

  const updateUser = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, setUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
