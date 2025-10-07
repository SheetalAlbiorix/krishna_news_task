# React Navigation Setup Guide

This project has been migrated from Expo Router to React Navigation for better navigation control and handling.

## 🚀 Features

- **Stack Navigation**: For screen-to-screen navigation
- **Tab Navigation**: For main app sections
- **Modal Presentation**: For bottle detail screen
- **Persistent Auth State**: Using AsyncStorage
- **Navigation Guards**: Error handling and validation
- **Type Safety**: Full TypeScript support

## 📁 Project Structure

```
├── navigation/
│   ├── AppNavigator.tsx      # Main navigation setup
│   └── NavigationService.ts  # Navigation utilities
├── screens/
│   ├── SplashScreen.tsx      # App splash screen
│   ├── WelcomeScreen.tsx     # Welcome/onboarding
│   ├── SignInScreen.tsx      # Sign in screen
│   ├── HomeScreen.tsx        # Collection screen
│   ├── BottleDetailScreen.tsx # Bottle details modal
│   └── SettingsScreen.tsx    # Settings screen
├── hooks/
│   └── useNavigation.ts      # Enhanced navigation hook
└── context/
    └── AuthContext.tsx       # Authentication context
```

## 🛠 Navigation Flow

### 1. App Initialization

```
SplashScreen (2s) → Auth Check → Welcome/SignIn OR MainTabs
```

### 2. Authentication Flow

```
WelcomeScreen → SignInScreen → MainTabs (after auth)
```

### 3. Main App Flow

```
MainTabs (Home/Settings) → BottleDetail (Modal)
```

## 📱 Screen Navigation

### Auth Screens

- **WelcomeScreen**: Initial onboarding
- **SignInScreen**: User authentication

### Main App Screens

- **HomeScreen**: Collection view with bottle grid
- **SettingsScreen**: App settings and sign out

### Modal Screens

- **BottleDetailScreen**: Detailed bottle information

## 🔧 Usage Examples

### Basic Navigation

```typescript
import { useNavigation } from "../hooks/useNavigation";

const MyScreen = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("BottleDetail", { bottleId: "123" });
  };

  const handleBack = () => {
    navigation.goBack();
  };
};
```

### Navigation Service (Global)

```typescript
import { NavigationService } from "../navigation/NavigationService";

// Navigate to specific screen
NavigationService.navigate("BottleDetail", { bottleId: "123" });

// Navigate to tab
NavigationService.navigateToTab("Home");

// Reset navigation stack
NavigationService.reset("MainTabs");
```

### Auth State Management

```typescript
import { useAuth } from "../context/AuthContext";

const MyComponent = () => {
  const { user, onboarded, signIn, signOut } = useAuth();

  const handleSignIn = async () => {
    await signIn(); // Navigation handled automatically
  };
};
```

## 🎯 Key Benefits

### 1. **Better Error Handling**

- Automatic fallback navigation
- Route validation
- Safe navigation methods

### 2. **Persistent State**

- Auth state saved to AsyncStorage
- App remembers login state
- Smooth app restarts

### 3. **Type Safety**

- Full TypeScript support
- Navigation parameter typing
- Screen prop validation

### 4. **Performance**

- Lazy loading of screens
- Optimized navigation stack
- Memory efficient

### 5. **Developer Experience**

- Centralized navigation logic
- Easy to debug
- Consistent API

## 🔄 Migration from Expo Router

### What Changed

1. **File Structure**: Moved from `app/` to `screens/`
2. **Navigation**: Replaced `useRouter` with `useNavigation`
3. **Routing**: File-based → Component-based
4. **State Management**: Added persistent auth state

### What Stayed the Same

1. **UI Components**: All existing components work
2. **Styling**: No changes to styles
3. **Functionality**: Same user experience
4. **Auth Flow**: Same authentication logic

## 🚦 Navigation Guards

The app includes several navigation guards:

1. **Auth Guard**: Redirects unauthenticated users to auth screens
2. **Onboarding Guard**: Ensures users complete onboarding
3. **Route Validation**: Prevents navigation to invalid routes
4. **Error Recovery**: Automatic fallback on navigation errors

## 📊 Navigation State

The navigation state is managed through:

- **AuthContext**: User authentication and onboarding state
- **AsyncStorage**: Persistent storage for auth state
- **NavigationService**: Global navigation utilities
- **React Navigation**: Screen stack management

## 🎨 Customization

### Adding New Screens

1. Create screen component in `screens/`
2. Add to appropriate navigator in `AppNavigator.tsx`
3. Update `NavigationService.ts` with new route
4. Add TypeScript types if needed

### Modifying Navigation Flow

1. Update `AppNavigator.tsx` for structural changes
2. Modify `AuthContext.tsx` for auth flow changes
3. Update `NavigationService.ts` for utility changes

## 🔍 Debugging

### Navigation Debugging

```typescript
// Get current route
const currentRoute = NavigationService.getCurrentRoute();

// Check if can go back
const canGoBack = NavigationService.canGoBack();

// Log navigation state
console.log("Current route:", currentRoute);
```

### Auth State Debugging

```typescript
const { user, onboarded, isLoading } = useAuth();
console.log("Auth state:", { user, onboarded, isLoading });
```

## 🚀 Getting Started

1. **Install Dependencies**: Already installed
2. **Run the App**: `npm start` or `expo start`
3. **Test Navigation**: Navigate through all screens
4. **Check Auth Flow**: Test sign in/out functionality

The app is now ready to use with React Navigation! 🎉
