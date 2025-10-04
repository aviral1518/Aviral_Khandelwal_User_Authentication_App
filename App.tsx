import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { PaperProvider } from 'react-native-paper';

function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <StatusBar barStyle="dark-content" />
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default App;
