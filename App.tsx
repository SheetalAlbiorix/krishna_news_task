import {
  EBGaramond_400Regular,
  EBGaramond_500Medium,
  EBGaramond_600SemiBold,
} from "@expo-google-fonts/eb-garamond";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { AuthProvider } from "./context/AuthContext";
import RootNavigator from "./navigation/AppNavigator";
import { ThemeProvider } from "./theme/ThemeProvider";

export default function App() {
  const [fontsLoaded] = useFonts({
    "EB Garamond": EBGaramond_400Regular,
    "EB Garamond Medium": EBGaramond_500Medium,
    "EB Garamond SemiBold": EBGaramond_600SemiBold,
  });

  if (!fontsLoaded) {
    return null; // or a loading screen
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        {" "}
        <AuthProvider>
          <StatusBar style="light" backgroundColor="#0E1A1D" />
          <RootNavigator />
          <Toast />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
