import { useTheme } from "@/theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IconSymbol } from "./ui/icon-symbol";

type Props = {
  title: string;
};

export default function AppHeader({ title }: Props) {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();

  const onSetting = () => {
    navigation.navigate("Settings");
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <View style={[styles.container, { borderBottomColor: theme.border }]}>
        <Text numberOfLines={1} style={[styles.title, { color: theme.text }]}>
          {title}
        </Text>
        <TouchableOpacity style={styles.setting} onPress={onSetting}>
          <IconSymbol size={30} color={theme.icon} name="gear" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff",
  },
  container: {
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#E6E6E6",
    borderBottomWidth: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "EB Garamond",
    textAlign: "center",
    alignSelf: "center",
    maxWidth: "80%",
    marginTop: Platform.OS === "android" ? 0 : 0,
  },
  setting: {
    position: "absolute",
    right: 16,
  },
});
