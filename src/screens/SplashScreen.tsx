import { View, StyleSheet } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

const SplashScreen: React.FC<Props> = ({ navigation }) => {
    const {setUser} = useAuth();

    const handleUserData = React.useCallback(async () => {
    try {
      const activeUserString = await AsyncStorage.getItem('activeUser');
      
      if (!activeUserString) {
        navigation.replace('Login');
        return;
      }
      
      const activeUser = JSON.parse(activeUserString);
      const userDataString = await AsyncStorage.getItem('userData');
      let userData: Array<{email: string}> = [];
      
      if (userDataString) {
        userData = JSON.parse(userDataString);
      }
      
      const userFound = userData.find(u => u.email === activeUser.email);
      
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
    <View style={styles.container}>
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
    backgroundColor: '#fff',
  },
  animation: {
    width: 500,
    height: 500,
  },
});

export default SplashScreen;