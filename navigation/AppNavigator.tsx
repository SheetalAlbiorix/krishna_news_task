import AppHeader from "@/components/AppHeader";
import Business from "@/screens/Business";
import Details from "@/screens/Details";
import { default as Health } from "@/screens/Health";
import SettingsScreen from "@/screens/SettingsScreen";
import SplashScreen from "@/screens/SplashScreen";
import Sport from "@/screens/Sport";
import Technology from "@/screens/Technology";
import { useTheme } from "@/theme/ThemeProvider";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Image } from "react-native";
import { navigationRef } from "./NavigationService";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator for authenticated users
function TabNavigator() {
  const { theme } = useTheme(); // get current theme

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        header: ({ route }) => <AppHeader title={route.name} />,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: theme.border,
          borderTopWidth: 1,
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarActiveTintColor: theme.primary, // primary color for active tab
        tabBarInactiveTintColor: theme.text, // text color for inactive tab
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "EB Garamond",
          fontWeight: "500",
        },
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="Technology"
        component={Technology}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Image
              source={require("../assets/images/Scan.png")}
              style={{
                width: size,
                height: size,
                tintColor: color,
                opacity: focused ? 1 : 0.7,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Business"
        component={Business}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Image
              source={require("../assets/images/SquaresFour.png")}
              style={{
                width: size,
                height: size,
                tintColor: color,
                opacity: focused ? 1 : 0.7,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Health"
        component={Health}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Image
              source={require("../assets/images/bottle-tab.png")}
              style={{
                width: size,
                height: size,
                tintColor: color,
                opacity: focused ? 1 : 0.7,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Sports"
        component={Sport}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Image
              source={require("../assets/images/GearSix.png")}
              style={{
                width: size,
                height: size,
                tintColor: color,
                opacity: focused ? 1 : 0.7,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Main App Navigator
function AppNavigator() {
  const [showSplash, setShowSplash] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Show splash screen for initial 2 seconds
  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen
        options={{
          headerShown: true,
          header: ({ route }) => <AppHeader title={route.name} />,
        }}
        name="Details"
        component={Details}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: true,
          header: ({ route }) => <AppHeader title={route.name} />,
        }}
      />
    </Stack.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <AppNavigator />
    </NavigationContainer>
  );
}
