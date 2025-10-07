import { Image } from "expo-image";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#fff" />

      {/* Wave pattern background */}
      <View style={styles.wavePattern} />

      {/* Logo GIF */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/Social media.gif")}
          style={styles.logo}
          contentFit="contain" // similar to resizeMode
          autoplay // ensures animation starts automatically
          transition={1000} // optional fade-in
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  wavePattern: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#fff",
    opacity: 0.1,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 400,
    height: 400,
  },
});
