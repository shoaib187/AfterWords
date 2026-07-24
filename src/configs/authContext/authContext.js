import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import * as Keychain from 'react-native-keychain';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const credentials = await Keychain.getGenericPassword({
          service: 'auth_token',
        });

        if (credentials) {
          const storedToken = credentials.password;
          setToken(storedToken);

          const userCredentials = await Keychain.getGenericPassword({
            service: 'user_data',
          });

          if (userCredentials) {
            try {
              const userData = JSON.parse(userCredentials.password);
              setUser(userData);
            } catch (parseError) {
              console.error('Error parsing user data:', parseError);
              setUser(null);
            }
          }

          setIsAuthenticated(true);
        } else {
          setToken(null);
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Keychain Error:', error);
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    loadAuthData();
  }, []);

  const login = useCallback(async (authToken, userData) => {
    try {
      await Keychain.setGenericPassword('user_session', authToken, {
        service: 'auth_token',
        securityLevel: Keychain.SECURITY_LEVEL.SECURE_SOFTWARE,
      });

      if (userData) {
        await Keychain.setGenericPassword(
          'user_session',
          JSON.stringify(userData),
          {
            service: 'user_data',
            securityLevel: Keychain.SECURITY_LEVEL.SECURE_SOFTWARE,
          },
        );
        setUser(userData);
      }

      setToken(authToken);
      setIsAuthenticated(true);

      return true;
    } catch (error) {
      console.error('Login Error:', error);
      return false;
    }
  }, []);

  const updateUser = useCallback(async userData => {
    try {
      if (userData) {
        await Keychain.setGenericPassword(
          'user_session',
          JSON.stringify(userData),
          {
            service: 'user_data',
            securityLevel: Keychain.SECURITY_LEVEL.SECURE_SOFTWARE,
          },
        );
        setUser(userData);
      }
    } catch (error) {
      console.error('Update User Error:', error);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await Keychain.resetGenericPassword({
        service: 'auth_token',
      });

      await Keychain.resetGenericPassword({
        service: 'user_data',
      });

      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout Error:', error);
    }
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated,
      setIsAuthenticated,
      login,
      updateUser,
      logout,
    }),
    [token, user, loading, isAuthenticated, login, updateUser, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
