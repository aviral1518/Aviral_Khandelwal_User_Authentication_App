import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { TextInput, HelperText, Portal, Dialog, Button } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

type FormData = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();
  const { theme } = useTheme();
  
  const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: FormData) => {
    const error = await login(data.email, data.password);
    if (error) {
      setErrorMessage(error);
      setErrorVisible(true);
    } else {
      navigation.replace('Home');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.primary }]}>Welcome</Text>
      
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              style={[styles.input, { backgroundColor: theme.colors.surface }]}
              mode="outlined"
              label="Email"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              autoCapitalize="none"
              error={!!errors.email}
              theme={theme}
              left={<TextInput.Icon icon="email" color={theme.colors.primary} />}
            />
            {errors.email && (
              <HelperText type="error" visible={!!errors.email}>
                {errors.email.message}
              </HelperText>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              style={[styles.input, { backgroundColor: theme.colors.surface }]}
              mode="outlined"
              label="Password"
              value={value}
              onChangeText={onChange}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              error={!!errors.password}
              theme={theme}
              left={<TextInput.Icon icon="lock" color={theme.colors.primary} />}
              right={
                <TextInput.Icon 
                  icon={showPassword ? "eye-off" : "eye"}
                  onPress={() => setShowPassword(!showPassword)}
                  color={theme.colors.primary}
                />
              }
            />
            {errors.password && (
              <HelperText type="error" visible={!!errors.password}>
                {errors.password.message}
              </HelperText>
            )}
          </>
        )}
      />

      <TouchableOpacity 
        style={[styles.button, !isValid && styles.buttonDisabled]}
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={[styles.linkText, { color: theme.colors.primary }]}>
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>

      <Portal>
        <Dialog 
          visible={errorVisible} 
          onDismiss={() => setErrorVisible(false)}
          theme={theme}
        >
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Text style={{ color: theme.colors.error }}>{errorMessage}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setErrorVisible(false)} theme={theme}>
              OK
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  input: {
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#1a73e8',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonDisabled: {
    backgroundColor: '#A4C2F4',
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  linkButton: {
    padding: 8,
    alignItems: 'center',
  },
  linkText: {
    color: '#1a73e8',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default LoginScreen;