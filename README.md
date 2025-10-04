# User Authentication App

A React Native application demonstrating modern authentication, secure storage, and theming capabilities using industry best practices.

## Features

### Authentication & Security
- **Secure User Authentication** using Context API
- **Encrypted Data Storage** using CryptoJS and AsyncStorage
- **Secure Password Management** with react-native-keychain
- **Form Validation** using react-hook-form and yup schema validation
- **Persistent Authentication** with encrypted storage

### User Interface
- **Dark/Light Theme Support** with react-native-paper
- **Theme Toggle** with persistent theme preference
- **Material Design Components** from react-native-paper
- **Responsive Layouts** using react-native-safe-area-context
- **Password Visibility Toggle** for better user experience

### Screens
- **Login Screen**
  - Email and password validation
  - Error handling with visual feedback
  - "Remember Me" functionality
  
- **Signup Screen**
  - Name, email, and password validation
  - Real-time form validation
  - Duplicate email checking
  
- **Home Screen**
  - User information display
  - Theme toggle switch
  - Secure logout functionality

### Developer Experience
- **TypeScript** for type safety and better development experience
- **Form Management** with react-hook-form for performance and reliability
- **Schema Validation** using yup for consistent data validation
- **Navigation** using React Navigation v7
- **Context API** for state management
- **Debugging Support** with detailed logging for data flow

## Technologies Used

### Core
- React Native
- TypeScript
- React Navigation 7

### State Management & Storage
- React Context API
- AsyncStorage
- CryptoJS for encryption
- react-native-keychain

### UI & Components
- react-native-paper
- react-native-safe-area-context
- react-native-vector-icons

### Form Management
- react-hook-form
- yup validation

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Project Structure

```
src/
├── context/
│   ├── AuthContext.tsx    # Authentication state management
│   └── ThemeContext.tsx   # Theme state management
├── navigation/
│   └── AppNavigator.tsx   # Navigation configuration
├── screens/
│   ├── LoginScreen.tsx    # Login screen with validation
│   ├── SignupScreen.tsx   # Signup screen with validation
│   ├── HomeScreen.tsx     # Protected home screen
│   └── SplashScreen.tsx   # Initial loading screen
└── utils/
    └── secureStorage.ts   # Encrypted storage utility
```

## Technical Details

### Secure Storage Implementation

The app implements a secure storage solution using:
- AsyncStorage for persistent data storage
- CryptoJS for data encryption
- Comprehensive logging for debugging
- Type-safe data retrieval with generics

```typescript
// Example of secure storage usage
await secureStorage.setItem('userData', user);
const userData = await secureStorage.getItem<UserData>('userData');
```

### Form Management

Forms are implemented using react-hook-form and yup for:
- Efficient form state management
- Real-time validation
- Type-safe form data
- Reduced re-renders
- Schema-based validation

```typescript
const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Min 6 characters').required('Required'),
});

const { control, handleSubmit } = useForm<FormData>({
  resolver: yupResolver(schema)
});
```

### Theme System

The app includes a comprehensive theming system:
- Light and dark theme support
- Material Design color system
- Theme persistence
- Runtime theme switching

## Features Implementation

### Authentication Context

- Uses React's Context API for global state management
- Handles login, signup, and logout functionality
- Persists user session using AsyncStorage

### Screens

#### Login Screen
- Email and password input fields
- Input validation
- Error messages display
- Password visibility toggle
- Navigation to Signup screen

#### Signup Screen
- Name, email, and password input fields
- Input validation for all fields
- Password strength requirement (minimum 6 characters)
- Error messages display
- Password visibility toggle
- Navigation to Login screen

#### Home Screen
- Displays logged-in user's information
- Logout functionality
- Protected route (only accessible when authenticated)

### Navigation

- Stack navigation implemented using React Navigation
- Protected routes based on authentication state
- Smooth transitions between screens

### Data Persistence

- User session persists across app restarts
- Automatic login if valid session exists
- Secure logout functionality

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
