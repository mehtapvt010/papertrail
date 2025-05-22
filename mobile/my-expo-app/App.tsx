import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/providers/AuthProvider';
import { QueryProvider } from './src/providers/QueryProvider';
import { useColorScheme } from './src/hooks/useColorScheme';
import { ScreenContent } from 'components/ScreenContent';
import './global.css';

export default function App() {
  const isDark = useColorScheme();

  return (
    <QueryProvider>
      <AuthProvider>
        <ScreenContent title="Home" path="App.tsx">
          {/* Replace with <RootNav /> when ready */}
        </ScreenContent>
        <StatusBar style={isDark ? 'light' : 'dark'} />
      </AuthProvider>
    </QueryProvider>
  );
}
