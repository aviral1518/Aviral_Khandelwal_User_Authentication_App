import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { PaperProvider } from 'react-native-paper';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

const AppContent = () => {
  const { theme, isDarkMode } = useTheme();
  
  return (
    <PaperProvider theme={theme}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </PaperProvider>
  );
};

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
