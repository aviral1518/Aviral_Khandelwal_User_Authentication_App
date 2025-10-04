import { View, StyleSheet } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAuth } from '../context/AuthContext';
import { secureStorage } from '../utils/secureStorage';
import { useTheme } from '../context/ThemeContext';

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

interface ActiveUser {
  name: string;
  email: string;
}

const SplashScreen: React.FC<Props> = ({ navigation }) => {
    const {setUser} = useAuth();
    const { theme } = useTheme();

    const handleUserData = React.useCallback(async () => {
    try {
      const activeUser = await secureStorage.getItem<ActiveUser>('activeUser');
      
      if (!activeUser) {
        navigation.replace('Login');
        return;
      }
      
      const userData = await secureStorage.getItem<Array<{email: string}>>('userData');
      const userFound = userData?.find(u => u.email === activeUser.email);
      
      if (userFound) {
        setUser(activeUser);
        navigation.replace('Home');
      } else {
        navigation.replace('Login');
      }
    } catch (error) {
      console.error('Error loading user:', error);
      navigation.replace('Login');
    }
  }, [navigation, setUser]);

  React.useEffect(() => {
    // You can adjust the timeout duration (currently set to 3000ms = 3 seconds)
    const timer = setTimeout(() => {
        handleUserData();
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, handleUserData]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <LottieView 
        source={require('../../assets/JSONS/loading.json')}
        autoPlay
        loop
        style={styles.animation}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 500,
    height: 500,
  },
});

export default SplashScreen;