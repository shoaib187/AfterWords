import React, { useEffect } from 'react';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { AuthProvider } from './src/configs/authContext/authContext';
import { AppNavigator } from './src/navigation/appNavigator/appNavigator';
import { Platform } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

// const asyncStoragePersister = createAsyncStoragePersister({
//   storage: AsyncStorage,
// });

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: Infinity,
      // Keep unused cache for 24 hours
      gcTime: 24 * 60 * 60 * 1000,
      // Don't refetch every time the app regains focus
      refetchOnWindowFocus: false,
      // Don't automatically refetch when reconnecting to the internet
      refetchOnReconnect: true,
      // Refetch when the component mounts if data is stale
      refetchOnMount: true,
      refetchInterval: false,
      networkMode: 'online',
    },
    mutations: {
      retry: 2,
      networkMode: 'online',
    },
  },
});

export default function App() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      SystemNavigationBar.setNavigationColor('#000000', 'light')
        .then(() => console.log('Navigation bar color set successfully'))
        .catch(error =>
          console.error('Failed to set navigation bar color:', error),
        );
    }
  }, []);

  return (
    <QueryClientProvider
      client={queryClient}
      // persistOptions={{
      //   persister: asyncStoragePersister,
      //   maxAge: 24 * 60 * 60 * 1000,
      // }}
    >
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </QueryClientProvider>
  );
}
