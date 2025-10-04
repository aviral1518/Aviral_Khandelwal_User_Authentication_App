import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Switch } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { theme, toggleTheme, isDarkMode } = useTheme();

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Splash' }],
      });
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>{`Hi, ${user?.name}!`}</Text>
        <View style={[styles.userInfo, { backgroundColor: theme.colors.surfaceVariant }]}>
          <Text style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>Name:</Text>
          <Text style={[styles.value, { color: theme.colors.onSurface }]}>{user?.name}</Text>
          <Text style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>Email:</Text>
          <Text style={[styles.value, { color: theme.colors.onSurface }]}>{user?.email}</Text>
        </View>

        <View style={[styles.themeToggle, { backgroundColor: theme.colors.surfaceVariant }]}>
          <Text style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>Dark Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            color={theme.colors.primary}
          />
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  userInfo: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.5,
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const exportedComponent = HomeScreen;
export default exportedComponent;