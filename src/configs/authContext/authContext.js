import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

// Method 1: Store Token in Keychain
const storeToken = async token => {
  try {
    if (!token) {
      console.error('No token provided');
      return false;
    }
    await Keychain.setGenericPassword('user_session', token, {
      service: 'auth_token',
      securityLevel: Keychain.SECURITY_LEVEL.SECURE_SOFTWARE,
    });
    return true;
  } catch (error) {
    console.error('Error storing token:', error);
    return false;
  }
};

// Method 2: Store isAuthenticated in AsyncStorage
const storeIsAuthenticated = async value => {
  try {
    await AsyncStorage.setItem('isAuthenticated', String(value));
    return true;
  } catch (error) {
    console.error('Error storing auth status:', error);
    return false;
  }
};

// Method 3: Get Token from Keychain
const getToken = async () => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: 'auth_token',
    });
    return credentials ? credentials.password : null;
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

// Method 4: Get isAuthenticated from AsyncStorage
const getIsAuthenticated = async () => {
  try {
    const value = await AsyncStorage.getItem('isAuthenticated');
    return value === 'true';
  } catch (error) {
    console.error('Error getting auth status:', error);
    return false;
  }
};

// Method 5: Clear Token only (keep isAuthenticated)
const clearToken = async () => {
  try {
    await Keychain.resetGenericPassword({
      service: 'auth_token',
    });
    return true;
  } catch (error) {
    console.error('Error clearing token:', error);
    return false;
  }
};

// Method 6: Clear everything (logout)
const clearAllAuth = async () => {
  try {
    await Keychain.resetGenericPassword({
      service: 'auth_token',
    });
    await AsyncStorage.removeItem('isAuthenticated');
    return true;
  } catch (error) {
    console.error('Error clearing auth:', error);
    return false;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticatedState] = useState(false);

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        // Check both token and isAuthenticated
        const [storedToken, authStatus] = await Promise.all([
          getToken(),
          getIsAuthenticated(),
        ]);

        console.log('🔑 Token found:', !!storedToken);
        console.log('📝 Auth status:', authStatus);

        if (storedToken && authStatus) {
          setToken(storedToken);
          setIsAuthenticatedState(true);
        } else {
          // If inconsistent, clean up
          if (storedToken) {
            await clearToken();
          }
          if (authStatus) {
            await storeIsAuthenticated(false);
          }
          setToken(null);
          setIsAuthenticatedState(false);
        }
      } catch (error) {
        console.error('Error loading auth data:', error);
        setToken(null);
        setIsAuthenticatedState(false);
      } finally {
        setLoading(false);
      }
    };

    loadAuthData();
  }, []);

  // Login method - stores both token and isAuthenticated
  const login = useCallback(async authToken => {
    try {
      if (!authToken) {
        console.error('No token provided');
        return false;
      }

      // Store token in Keychain
      const tokenStored = await storeToken(authToken);
      if (!tokenStored) {
        console.error('Failed to store token');
        return false;
      }
      setToken(authToken);

      return true;
    } catch (error) {
      console.error('Login Error:', error);
      return false;
    }
  }, []);

  // Logout method - clears everything
  const logout = useCallback(async () => {
    try {
      await clearAllAuth();
      setToken(null);
      setIsAuthenticatedState(false);
      return true;
    } catch (error) {
      console.error('Logout Error:', error);
      return false;
    }
  }, []);

  // Set isAuthenticated separately
  const setIsAuthenticated = useCallback(async value => {
    try {
      const stored = await storeIsAuthenticated(value);
      if (stored) {
        setIsAuthenticatedState(value);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error setting auth status:', error);
      return false;
    }
  }, []);

  const value = useMemo(
    () => ({
      token,
      loading,
      isAuthenticated,
      setIsAuthenticated,
      login,
      logout,
      setToken,
    }),
    [token, loading, isAuthenticated, login, logout, setIsAuthenticated],
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
