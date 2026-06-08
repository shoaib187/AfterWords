import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';

import * as Keychain from 'react-native-keychain';
import { useQueryClient } from '@tanstack/react-query';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load token
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const credentials = await Keychain.getGenericPassword({
          service: 'auth_token',
        });

        if (credentials) {
          setToken(credentials.password);
        } else {
          setToken(null);
        }
      } catch (error) {
        console.error('Keychain Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  // Save token
  const saveToken = useCallback(async newToken => {
    try {
      await Keychain.setGenericPassword('user_session', newToken, {
        service: 'auth_token',
        securityLevel: Keychain.SECURITY_LEVEL.SECURE_SOFTWARE,
      });

      setToken(newToken);
    } catch (error) {
      console.error('Save Token Error:', error);
    }
  }, []);

  // Logout
  const logout = useCallback(async () => {
    try {
      await Keychain.resetGenericPassword({
        service: 'auth_token',
      });

      queryClient.clear();

      setToken(null);
    } catch (error) {
      console.error('Logout Error:', error);
    }
  }, [queryClient]);

  const value = useMemo(
    () => ({
      token,
      loading,
      isAuthenticated: !!token,
      saveToken,
      logout,
    }),
    [token, loading, saveToken, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
